import React, {FC, useState, SyntheticEvent} from 'react'
import ResultsMap from './ResultsMap'

const Main: FC = () => {

    const [polyline, setPolyine] = useState('')
    const [encodedPolyline, setEncodedPolyline] = useState('')

    function handleChange(event: SyntheticEvent<HTMLTextAreaElement>) {
        setPolyine(event.currentTarget.value)
    }

    function handleSubmit(event: SyntheticEvent) {
        console.log('in handle submit')
        setEncodedPolyline(polyline)
        event.preventDefault();
    }

    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div className="main-container">
                        <label htmlFor="polylineTextArea">Patse your encoded polyline and see how it appears on the map</label>
                        <textarea id="polylineTextArea" name="polyline" value={polyline} onChange={handleChange} />
                        <input className="button-blue" type="submit" value="Draw Polyline" />
                        <p>If you haven't previously registered a google API key, head to 
                        <a target="_blank" rel="noopener noreferrer" href='https://developers.google.com/maps/documentation/javascript/get-api-key'>
                             Get a google API Key
                        </a>
                         to create one, and paste it into the appropriate postion in the 'script' tag in the index.html file
                    </p>
                    </div>
                </fieldset>
            </form>
            <ResultsMap encodedPolyline={encodedPolyline} />
        </div>
    )

}

export default Main