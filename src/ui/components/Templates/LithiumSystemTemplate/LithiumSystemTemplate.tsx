import { useState, useLayoutEffect, useRef } from 'react'
import { BaseTemplate, BaseTemplateProps } from '../BaseTemplate'
import styled, { useTheme } from 'styled-components'
import backgroundSrc from '../../../../assets/images/vista1.png'
import { LithiumSystemCard, type ValveMetric } from '../../Molecules/LithiumSystemCard'
import type { IconName } from '../../Atoms/Icon'

const IMAGE_NATURAL_WIDTH = 1459
const IMAGE_NATURAL_HEIGHT = 777
const IMAGE_ASPECT = IMAGE_NATURAL_WIDTH / IMAGE_NATURAL_HEIGHT

const CARD_WIDTH = 159
const CARD_HEIGHT = 72

function getCardEdgePoint(
  cx: number,
  cy: number,
  tx: number,
  ty: number,
  cardWidth: number,
  cardHeight: number
): { x: number; y: number } {
  const dx = tx - cx
  const dy = ty - cy
  if (dx === 0 && dy === 0) return { x: cx, y: cy }

  const cardHalfWidth = cardWidth / 2
  const cardHalfHeight = cardHeight / 2

  let bestT = Infinity
  let bestX = cx
  let bestY = cy

  if (dx < 0) {
    const t = -cardHalfWidth / dx
    const y = cy + t * dy
    if (t >= 0 && t < bestT && Math.abs(y - cy) <= cardHalfHeight) {
      bestT = t; bestX = cx - cardHalfWidth; bestY = y
    }
  }

  if (dx > 0) {
    const t = cardHalfWidth / dx
    const y = cy + t * dy
    if (t >= 0 && t < bestT && Math.abs(y - cy) <= cardHalfHeight) {
      bestT = t; bestX = cx + cardHalfWidth; bestY = y
    }
  }

  if (dy < 0) {
    const t = -cardHalfHeight / dy
    const x = cx + t * dx
    if (t >= 0 && t < bestT && Math.abs(x - cx) <= cardHalfWidth) {
      bestT = t; bestX = x; bestY = cy - cardHalfHeight
    }
  }

  if (dy > 0) {
    const t = cardHalfHeight / dy
    const x = cx + t * dx
    if (t >= 0 && t < bestT && Math.abs(x - cx) <= cardHalfWidth) {
      bestT = t; bestX = x; bestY = cy + cardHalfHeight
    }
  }

  return { x: bestX, y: bestY }
}

const Container = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.xl};
`

const Background = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${backgroundSrc});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

`

const CardWrapper = styled.div`
  position: absolute;
`

const LinesSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
`

export interface CardData {
  id: string
  title: string
  value?: string | number
  unit?: string
  x: number
  y: number
  variant?: 'standard' | 'valve'
  iconName?: IconName
  metrics?: ValveMetric[]
}

export interface LineData {
  cardId: string
  x1?: number
  y1?: number
  x2: number
  y2: number
}

export interface LithiumSystemTemplateProps extends Omit<BaseTemplateProps, 'title' | 'children'> {
  cards: CardData[]
  lines?: LineData[]
}

export function LithiumSystemTemplate({ sidebar, cards, lines }: LithiumSystemTemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef(new Map<string, HTMLDivElement>())
  const theme = useTheme()
  const [imageRect, setImageRect] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [cardSizes, setCardSizes] = useState<Record<string, { width: number; height: number }>>({})

  useLayoutEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const { width: cw, height: ch } = containerRef.current.getBoundingClientRect()

      let imgW: number, imgH: number, left: number, top: number

      if (cw / ch > IMAGE_ASPECT) {
        imgH = ch
        imgW = ch * IMAGE_ASPECT
        left = (cw - imgW) / 2
        top = 0
      } else {
        imgW = cw
        imgH = cw / IMAGE_ASPECT
        left = 0
        top = (ch - imgH) / 2
      }

      setImageRect({ left, top, width: imgW, height: imgH })
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useLayoutEffect(() => {
    const updateCardSizes = () => {
      const nextSizes: Record<string, { width: number; height: number }> = {}

      cardRefs.current.forEach((element, id) => {
        const { width, height } = element.getBoundingClientRect()
        if (width > 0 && height > 0) nextSizes[id] = { width, height }
      })

      setCardSizes((currentSizes) => {
        const ids = Object.keys(nextSizes)
        const hasChanged = ids.length !== Object.keys(currentSizes).length
          || ids.some((id) => (
            currentSizes[id]?.width !== nextSizes[id].width
            || currentSizes[id]?.height !== nextSizes[id].height
          ))

        return hasChanged ? nextSizes : currentSizes
      })
    }

    updateCardSizes()

    if (typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(updateCardSizes)
    cardRefs.current.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [cards])

  const resolvedLines: { cardId: string; x1: number; y1: number; x2: number; y2: number }[] =
    lines?.map((l) => {
      const targetX = imageRect.left + l.x2 * imageRect.width
      const targetY = imageRect.top + l.y2 * imageRect.height

      let x1: number, y1: number
      if (l.x1 !== undefined && l.y1 !== undefined) {
        x1 = imageRect.left + l.x1 * imageRect.width
        y1 = imageRect.top + l.y1 * imageRect.height
      } else {
        const card = cards.find((c) => c.id === l.cardId)
        if (card) {
          const cx = imageRect.left + card.x * imageRect.width
          const cy = imageRect.top + card.y * imageRect.height
          const cardSize = cardSizes[card.id]
          const edge = getCardEdgePoint(
            cx,
            cy,
            targetX,
            targetY,
            cardSize?.width ?? CARD_WIDTH,
            cardSize?.height ?? CARD_HEIGHT
          )
          x1 = edge.x
          y1 = edge.y
        } else {
          x1 = imageRect.left
          y1 = imageRect.top
        }
      }

      return { cardId: l.cardId, x1, y1, x2: targetX, y2: targetY }
    }) ?? cards.map((c) => {
      const cy = imageRect.top + c.y * imageRect.height
      const cx = imageRect.left + c.x * imageRect.width
      return { cardId: c.id, x1: cx, y1: cy - 50, x2: cx, y2: cy }
    })

  return (
    <BaseTemplate sidebar={sidebar} title="Lithium System Overview">
      <Container ref={containerRef}>
        <Background />
        {cards.map((card) => {
          const cx = imageRect.left + card.x * imageRect.width
          const cy = imageRect.top + card.y * imageRect.height
          return (
            <CardWrapper
              key={card.id}
              ref={(element) => {
                if (element) cardRefs.current.set(card.id, element)
                else cardRefs.current.delete(card.id)
              }}
              data-testid={`sensor-card-${card.id}`}
              style={{
                left: cx,
                top: cy,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <LithiumSystemCard
                title={card.title}
                value={card.value}
                unit={card.unit}
                variant={card.variant}
                iconName={card.iconName}
                metrics={card.metrics}
              />
            </CardWrapper>
          )
        })}
        <LinesSvg>
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="expanded" />
              <feGaussianBlur in="expanded" stdDeviation="4.55" result="blur" />
              <feFlood floodColor="#EBB400" floodOpacity="0.4" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="shadow" />
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="valve-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="expanded" />
              <feGaussianBlur in="expanded" stdDeviation="4.55" result="blur" />
              <feFlood floodColor={theme.colors.anomalyFlag} floodOpacity="0.4" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="shadow" />
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {resolvedLines.map((line) => {
            const isValveLine = cards.find((card) => card.id === line.cardId)?.variant === 'valve'
            const lineColor = isValveLine ? theme.colors.anomalyFlag : theme.colors.semanticPrimary

            return (
              <g key={line.cardId} data-card-id={line.cardId}>
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={lineColor}
                strokeWidth={2}
                strokeDasharray="1,1"
              />
                <circle cx={line.x1} cy={line.y1} r={2} fill={lineColor} />
                <circle
                  cx={line.x2}
                  cy={line.y2}
                  r={4}
                  fill={lineColor}
                  stroke="#000000"
                  strokeWidth={2}
                  filter={isValveLine ? 'url(#valve-glow)' : 'url(#glow)'}
                />
              </g>
            )
          })}
        </LinesSvg>
      </Container>
    </BaseTemplate>
  )
}
