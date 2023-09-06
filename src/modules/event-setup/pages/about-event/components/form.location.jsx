import { Console } from "ems-component"
import { useState, memo, useEffect, useCallback, useRef, useMemo } from "react"
import clsx from "clsx"
import ModalLocationComponent from "./modals/modal-location.component"
import dynamic from "next/dynamic"
import MapLeaflet from '@/src/components/Maps/Leaflet'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import { useForm } from 'react-hook-form'

const MapMemo = memo(MapLeaflet)

const FornLocation = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loadingAddress, setLoadingAddress] = useState(false)
  const [position, setPosition] = useState([3.590446, 98.678430])
  const markerRef = useRef(null)
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm()

  const { search_id } = watch()

  const fetchAddressMap = useCallback(async () => {
    setLoadingAddress(true)
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position[0]}&lon=${position[1]}`)
      .then((res) => res?.json())
      .then((res) => {
        setLoadingAddress(false)
        setValue('address_location', res?.display_name)
      })
  }, [position, setValue])

  useEffect(() => {
    (async () => {
      await fetchAddressMap()
    })()
  }, [fetchAddressMap])


  const eventHandlers = useMemo(
    () => ({
      dragend () {
        const marker = markerRef.current
        if (marker != null) {
          setPosition([marker.getLatLng()?.lat, marker.getLatLng()?.lng])
        }
      },
    }),
    [],
  )

  const onSearchAddress = async (inputValue) => {
    setLoadingAddress(true)
    const res = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${inputValue}&polygon_geojson=1&format=jsonv2`)
      .then((res) => res?.json())
    setLoadingAddress(false)

    return res?.map(d => ({
      value: d?.place_id,
      label: d?.display_name,
      position: [d?.lat, d?.lon]
    }))
  }

  useEffect(() => {
    if (search_id) {
      setPosition(search_id?.position)
    }
  }, [search_id])


  return (
    <div className="mt-8 p-5 box">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-medium text-xl text-slate-700">Event Location</div>
        {isEdit ? (
          <Console.Button variant="outline-primary" className="text-sm" onClick={() => setIsEdit(false)}>
            <Console.Lucide icon="SaveIcon" className="w-5 h-5 mr-1" />
            Submit
          </Console.Button>
        ) : (
          <div>
            <Console.Tippy
              content="Update Banner ?"
            >
              <Console.Button
                variant="outline-dark"
                type="button"
                onClick={() => setIsEdit(true)}
              >
                <Console.Lucide icon="Edit" className="w-4 h-4" />
              </Console.Button>
            </Console.Tippy>
          </div>
        )}
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 relative">
          <label>Please type your event location will be held</label>
          <ReactSelectAsync
            id="search_id"
            name="search_id"
            control={control}
            loadOption={onSearchAddress}
            placeholder="Search Location..."
            noOptionsMessage="Search location..."
            isInputSearch
            isDisabled={!isEdit}
            errorMessage={errors?.search_id?.message}
          />
        </div>
        <div className="col-span-6">
          <MapMemo width="800" height="400" center={position} zoom={15}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker
                  position={position}
                  draggable={true}
                  eventHandlers={eventHandlers}
                  ref={markerRef}
                >
                </Marker>
              </>
            )}
          </MapMemo>
          <div className="flex items-center justify-center mt-4">
            <div className="text-sm">Pin Point Map</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FornLocation