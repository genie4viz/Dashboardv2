import React from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-awesome-scroll';
import NegativeGraphContainer from '../NegativeGraphContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

library.add(faChartBar);

const CashFlowContainer = ({security}) => 
    <div className="box  has-text-grey">
        <h3 className="subtitle is-5 has-text-weight-bold has-text-grey" style={{ height: '10px' }}>
            Cashflow
        </h3>
        <hr />
        <div className="columns">
            <div className="column is-1" />
            {security.sector != 'Finance' ? (
            <div className="column is-2">
                <span style={{ color: 'red', fontWeight: '600', fontSize: '15pt' }}>|&nbsp;</span>
                <span>EBITDA</span>
            </div>
            ) : (
            <></>
            )}
            <div className="column is-2">
            <span style={{ color: 'LimeGreen', fontWeight: '600', fontSize: '15pt' }}>●&nbsp;</span>
            <span>Cashflow from Operating activities</span>
            </div>
            <div className="column is-2">
            <span style={{ color: 'DarkGreen', fontWeight: '600', fontSize: '15pt' }}>●&nbsp;</span>
            <span>Cashflow from Investing activites</span>
            </div>
            <div className="column is-2">
            <span style={{ color: 'grey', fontWeight: '600', fontSize: '15pt' }}>●&nbsp;</span>
            <span>Cashflow from Financing activites</span>
            </div>
            <div className="column is-2">
            <span style={{ color: 'black', fontWeight: '600', fontSize: '15pt' }}>●&nbsp;</span>
            <span>Change in Cash</span>
            </div>
            <div className="column is-1" />
        </div>
        <div className="columns">            
            <div className="column is-6" style={{textAlign: 'center'}}>
                {security && security.calculated5Y ?
                    <NegativeGraphContainer data={security.calculated5Y} sector={security.sector} />
                    : <FontAwesomeIcon icon={faChartBar} size={"10x"} style={{opacity: 0.1, marginTop: 80}}/>
                }
            </div>
            <div className="column is-6" style={{ height: 380 }}>
                <Scroll>
                    <p>
                    Cashflow is the nett amount of cash that flows in or out the company during a period. This number
                    differs from the profit (or loss) that a company makes because the moments costs and revenues are booked
                    are different from the moments incoming and outgoing bills are payed.
                    </p>
                    <p>
                    The cashflow statement is usually broken down in three components. The sum of these components is the
                    change in cash during a specific period.
                    </p>
                    <strong>Cashflow from Operating Activities</strong>
                    <p>
                    This is the amount of cash generated by the normal business activity. A positive number shows that the
                    company is able to maintain its operations. However, keep in mind that this number does not take into
                    account the costs that are associated with depreciation. Also, other factors like changes in working
                    capital make this number deviate from income.
                    </p>
                    <strong>Cashflow from Investing Activities</strong>
                    <p>
                    This number represents the change in cash resulting from investments and disinvestments. Examples are
                    buying machinery, plants and vehicles that are required for a manufacturer.
                    </p>
                    <strong>Cashflow from Financing Activities</strong>
                    <p>
                    Cashflow from financing activities shows the net flows of cash that are used to fund the company. This
                    means new debt that has been issued, bank lending and changes in equity. Also, paid dividends fall in
                    this category.
                    </p>                    
                </Scroll>
            </div>
        </div>
    </div>

CashFlowContainer.propTypes = {    
    security: PropTypes.object.isRequired
};

export default CashFlowContainer;