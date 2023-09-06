import { Console } from "ems-component"
import clsx from "clsx"
import { useForm } from 'react-hook-form'
import dynamic from "next/dynamic"
import MapLeaflet from '@/src/components/Maps/Leaflet'
// import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useState, useMemo, useRef, useCallback, useEffect, memo } from "react"
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import { examplePromiseOptions } from '@/src/services/example.service'
const MapsOther = dynamic(() => import('@/src/components/Maps/Other'), {
  ssr: false
});

const MapMemo = memo(MapLeaflet)

// const provider = new OpenStreetMapProvider();

const ModalUpload = ({ isOpen, onChange }) => {
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

  // useEffect(() => {
  //   setValue('pin_point', position)
  // }, [position, setValue])

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

  // const getLocation = ({lat, lng}) => {
  //   console.log('UPDA LOCATION ', lat, lng)
  //   setPosition([lat, lng])
  // }

  // const onSearch = async (value) => {
  //   const results = await provider.search({ query: value });
  //   console.log('RES ', results)
  // }

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
    <Console.Dialog
      staticBackdrop={true}
      open={isOpen}
      size="lg"
      onClose={() => {
        onChange(false);
      }}
    >
      <Console.Dialog.Panel>
        <Console.Dialog.Description className="p-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 border rounded-md p-4">
              <div className="text-lg font-bold text-slate-700">Add Pin Location</div>
              <div className="mt-4">
                <div className="relative z-[1001]">
                  <Console.FormLabel htmlFor="search_id" className="text-sm">Search Location<span className="text-danger">*</span></Console.FormLabel>
                  <ReactSelectAsync
                    id="search_id"
                    name="search_id"
                    control={control}
                    loadOption={onSearchAddress}
                    placeholder="Search Location..."
                    noOptionsMessage="Search location..."
                    controlStyle={errors?.search_id ? { border: '1px solid #ff1e1e' } : {}}
                    isInputSearch
                  />
                  {errors.search_id && (
                    <div className="mt-2 text-danger text-sm">
                      {typeof errors.search_id.message === "string" &&
                        errors.search_id.message}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  {/* <MapsOther center={position} getLatLng={getLocation} /> */}
                  {/* <Maps /> */}
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
                </div>
              </div>
              {/* <div className="mt-4">
                <Console.FormLabel htmlFor="pin_point" className="text-sm">Pin Point</Console.FormLabel>
                <Console.FormInput
                  {...register("pin_point")}
                  id="pin_point"
                  name="pin_point"
                  type="text"
                  className={clsx([
                    "block min-w-full",
                    { "border-danger": errors.pin_point }
                  ])}
                  disabled
                  autoComplete="off"
                />
                {errors.pin_point && (
                  <div className="mt-2 text-danger text-sm">
                    {typeof errors.pin_point.message === "string" &&
                      errors.pin_point.message}
                  </div>
                )}
              </div> */}
              {/* <div className="mt-4">
                <Console.FormLabel htmlFor="address_location" className="text-sm">Address<span className="text-danger">*</span></Console.FormLabel>
                <Console.FormTextarea
                  {...register("address_location")}
                  id="address_location"
                  name="address_location"
                  className={clsx([
                    "block min-w-full",
                    { "border-danger": errors.address_location }
                  ])}
                  placeholder="PT. Satu Pintu"
                  autoComplete="off"
                  disabled={loadingAddress}
                />
                {errors.address_location && (
                  <div className="mt-2 text-danger text-sm">
                    {typeof errors.address_location.message === "string" &&
                      errors.address_location.message}
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </Console.Dialog.Description>
        <Console.Dialog.Footer>
          <Console.Button
            type="button"
            variant="outline-secondary"
            className="w-20 mr-1"
            onClick={() => {
              onChange(false);
            }}
          >
            Cancel
          </Console.Button>
          <Console.Button
            variant="primary"
            type="button"
            className="px-8"
          >
            Submit
          </Console.Button>
        </Console.Dialog.Footer>
      </Console.Dialog.Panel>
    </Console.Dialog>
  )
}

export default ModalUpload
