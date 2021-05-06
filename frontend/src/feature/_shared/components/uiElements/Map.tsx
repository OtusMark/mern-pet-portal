import React, {useEffect, useRef} from "react";
import styled from "styled-components/macro";

export const Map: React.FC<PropsT> = (props) => {

    const mapRef = useRef();

    const {
        center,
        zoom,
    } = props;

    useEffect(() => {
        // @ts-ignore
        new ol.Map({
            // @ts-ignore
            target: mapRef.current.id,
            layers: [
                // @ts-ignore
                new ol.layer.Tile({
                    // @ts-ignore
                    source: new ol.source.OSM()
                })
            ],
            // @ts-ignore
            view: new ol.View({
                // @ts-ignore
                center: ol.proj.fromLonLat([center.lng, center.lat]),
                zoom: zoom
            })
        });
    }, [center, zoom]);

    return (
        <MapMain
            // @ts-ignore
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
            id="map">
        </MapMain>
    );
}

// Styles
const MapMain = styled.div`
  width: 100%;
  height: 20rem;
`

// Types
type PropsT = any