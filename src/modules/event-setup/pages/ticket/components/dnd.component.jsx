import { useRef, useState, useCallback, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import update from 'immutability-helper'
import clsx from 'clsx'
import { Console } from 'ems-component'
import moment from 'moment'
import { currentcyKiloFormat } from '@/src/utils/currency'
import ticket from "../../../services/ticket";

const Card = ({ id, data, index, moveCard }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect (monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover (item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientX = clientOffset.x - hoverBoundingRect.left
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={clsx([
        "w-full h-full flex flex-col justify-between border relative cursor-move rounded-lg border-slate-200 shadow-xl group",
        "bg-white hover:bg-[#dc143c] hover:text-white",
      ],
        { 'opacity-0': isDragging }
      )}
      data-handler-id={handlerId}>
      <div className="p-4">
        <div className="relative flex flex-col items-center">
          <div className="font-[900] text-xl">{data?.name}</div>
          <div className="mt-2 flex items-center justify-center text-xs">
            <div className="font-[900]">{data?.description}</div>
          </div>
          <div className={clsx(["my-4 text-4xl", "group-hover:text-white text-[#dc143c]"])}>{data?.currency}{currentcyKiloFormat(data?.price)}</div>
        </div>
        <div>
          {data?.benefits?.map((benefit, key) => {
            return (
              <div key={key} className="flex items-center mt-2">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <Console.Lucide
                    icon="Check"
                    className={
                      clsx([
                        "w-4 h-4 text-[#dc143c]",
                        "group-hover:text-white text-[#dc143c]",
                      ])}
                  />
                </div>
                <div className="text-sm truncate w-full">{benefit}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="p-2 border-t border-slate-200/60 dark:border-darkmode-400">
        <div className="flex items-center mb-2">
          <Console.Lucide icon="Clock1" className="w-4 h-4 mr-2" />
          <div className="text-xs mt-0.5">
            {`End Date ${moment().format('MMMM DD, YYYY HH:mm A')}`}
          </div>
        </div>
      </div>
    </div>
  )
}

const Container = ({ setDatas }) => {
  const [cards, setCards] = useState([])

  const fetchAll = async () => {
    await ticket.get().then((res) => {
      setCards(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])

  useEffect(() => {
    setDatas(cards)
  }, [cards])

  const renderCard = useCallback((card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.index}
        data={card}
        moveCard={moveCard}
      />
    )
  }, [moveCard])

  return (
    <>
      <div className="grid grid-cols-4 gap-4">{cards.map((card, i) => renderCard(card, i))}</div>
    </>
  )
}

export default Container
