import {Card} from "../layout/Card";
import React from "react";

export const Alerts: React.FC<PropsT> = props => {

    const {
        alert,
        error
    } = props

    return (
        <Card>
            <div>Alert: {alert}</div>
            <div>Error: {error}</div>
        </Card>
    )
}

// Types
type PropsT = {
    alert: string | null
    error: string | null
}