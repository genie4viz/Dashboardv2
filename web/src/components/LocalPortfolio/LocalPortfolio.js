import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'

import RoundGraphContainer from '../RoundGraphContainer'
import { AppContext } from '../AppContext'

import { useHighlight, usePortfolio } from '../../lib/custom-hooks'

import { formatIntl, formatPercentage } from '../../lib/format-intl'

library.add(faChartPie)

const LocalPortfolio = ({ security, index }) => {
  let { store } = useContext(AppContext)
  const { togglePortfolio, isInPortfolio } = usePortfolio({})

  const last = +(security && security.liveData && security.liveData.last)
  const highlightClass = useHighlight(last)

  let curData = security.calculatedCircular
    ? security.calculatedCircular.filter(
      e => e.Year === store.securityFilterYear
    )[0]
    : null
  security.longBusinessDescription = security.longBusinessDescription.replace(
    '&',
    '^'
  ) // for parse exception
  return (
    <div
      className='box has-text-grey'
      key={security.id}
      style={{
        borderRadius: '1px',
        height: '320px',
        padding: '10px',
        margin: '10px'
      }}
    >
      <div
        className='columns'
        style={{ minWidth: '250px', height: '28px', display: 'flex' }}
      >
        <div className='column is-7'>
          <Link
            key={security.id}
            href={`/security?id=${security.id}&short=${JSON.stringify(
              security
            )}`}
            as={`/security/${security.id}`}
          >
            <h3
              className='subtitle is-5 has-text-weight-bold has-text-grey'
              style={{
                width: '130px',
                height: '50px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}
            >
              {security.name}
            </h3>
          </Link>
        </div>
        <div className='column is-2'>
          <a
            className={'button is-dark is-small has-text-weight-bold ' + index}
            id={'addbutton' + index}
            style={{ backgroundColor: '#7d7d7d' }}
            onClick={() => togglePortfolio(security.id)}
          >
            {isInPortfolio(security.id) ? '-' : '+'}
          </a>
        </div>
        <div className='column is-1'>
          <Link
            key={security.id}
            href={`/security?id=${security.id}&short=${JSON.stringify(
              security
            )}`}
            as={`/security/${security.id}`}
          >
            <a
              className='button is-dark is-small has-text-weight-bold'
              style={{ backgroundColor: '#7d7d7d' }}
            >
              <FontAwesomeIcon icon='search' />
            </a>
          </Link>
        </div>
      </div>
      <div style={{ height: '18px', fontSize: '11pt' }}>
        <span className={highlightClass}>
          {formatIntl(last, security.currency)}
        </span>

        <span className='is-pulled-right'>
          {security.liveData &&
            security.liveData.changePercent &&
            formatPercentage(+security.liveData.changePercent)}
        </span>
      </div>
      <div style={{ height: '2px', fontSize: '11pt' }}>{security.sector}</div>
      <hr />
      <div
        className={'RoundGraph' + security.id}
        style={{ textAlign: 'center' }}
      >
        {curData != null ? (
          <RoundGraphContainer
            key={security.id}
            idx={security.id + index}
            params={curData}
            width={220}
            height={190}
          />
        ) : (
          <FontAwesomeIcon
            icon={faChartPie}
            size={'10x'}
            style={{ opacity: 0.1 }}
          />
        )}
      </div>
    </div>
  )
}

LocalPortfolio.propTypes = {
  index: PropTypes.string.isRequired,
  security: PropTypes.shape({
    calculatedCircular: PropTypes.arrayOf(
      PropTypes.shape({
        Balance: PropTypes.number,
        Dividend: PropTypes.number,
        Growth: PropTypes.number,
        Total: PropTypes.number,
        Value: PropTypes.number,
        Year: PropTypes.number
      })
    ),
    liveData: PropTypes.shape({
      changePercent: PropTypes.number,
      last: PropTypes.number
    }),
    currency: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sector: PropTypes.string.isRequired
  }).isRequired
}

export default LocalPortfolio
