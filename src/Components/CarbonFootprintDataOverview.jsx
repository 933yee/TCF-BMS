import React, { useState, useEffect } from 'react';
import {
    changePageState,
} from 'States/actions.js';

import { connect, useDispatch } from 'react-redux';
import { GetDashBoardOverview } from 'Utilities/ApiServices.js';

import './DataOverview.css';

function CarbonFootprintDataOverview(props) {



    return (
        <div className='carbon-footprint-data-overview'>
        </div>
    );
}
export default CarbonFootprintDataOverview;