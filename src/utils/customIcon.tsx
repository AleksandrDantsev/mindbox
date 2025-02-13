import React from "react"
import { Icon } from "@ricons/utils"

export const CustomIcon = (icon: React.ReactNode, size: number = 20, color: string = "#ababab") => {
    return (
        <Icon size={size} color={color}>
            {icon}
        </Icon>
    )
}
