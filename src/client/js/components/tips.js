import React from 'react'
import { render } from 'react-dom'

class Tips extends React.Component{

    render(){
        return(
            <div id="tips">
                <span>
                    {this.props.mes}
                </span>

            </div>

        )
    }


}

export default Tips;
