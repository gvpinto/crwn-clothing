import React from 'react';

import {SpinnerContainer, SpinnerOverlay} from './with-spinner.styles';

const WithSpinner = WrappedCommponent => ({isLoading, ...otherProps}) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    ) : (
        <WrappedCommponent {...otherProps}/>
    )
};

// const WithSpinner = WrappedCommponent => {
    
//     const spinner = ({isLoading, ...otherProps}) => {
//         return isLoading ? (
//             <SpinnerOverlay>
//                 <SpinnerContainer/>
//             </SpinnerOverlay>
//         ) : (
//             <WrappedCommponent {...otherProps}/>
//         )
//     }

//     return spinner;
// };

export default WithSpinner;