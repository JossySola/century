"use client"
export function MenuAlt({ height = 16, width = 16, color = "currentColor" }) {
    return (
        <svg 
        data-testid="geist-icon" 
        height={ height } 
        strokeLinejoin="round" 
        style={{ color }} 
        viewBox="0 0 16 16" 
        width={ width }>
            <path 
            fill-rule="evenodd" 
            clip-rule="evenodd" 
            d="M1 2H1.75H14.25H15V3.5H14.25H1.75H1V2ZM1 12.5H1.75H14.25H15V14H14.25H1.75H1V12.5ZM1.75 7.25H1V8.75H1.75H14.25H15V7.25H14.25H1.75Z" 
            fill="currentColor"></path>
        </svg>
    )
}
export function Heart({ height = 16, width = 16, color = "currentColor" }) {
    return (
        <svg 
        data-testid="geist-icon" 
        height={ height } 
        strokeLinejoin="round" 
        style={{ color }}
        viewBox="0 0 16 16" 
        width={ width }>
            <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M7.06463 3.20474C5.79164 1.93175 3.72772 1.93175 2.45474 3.20474C1.18175 4.47773 1.18175 6.54166 2.45474 7.81465L8 13.3599L13.5453 7.81465C14.8182 6.54166 14.8182 4.47773 13.5453 3.20474C12.2723 1.93175 10.2084 1.93175 8.93537 3.20474L8.53033 3.60979L8 4.14012L7.46967 3.60979L7.06463 3.20474ZM8 2.02321C6.13348 0.286219 3.21165 0.326509 1.39408 2.14408C-0.464694 4.00286 -0.464691 7.01653 1.39408 8.87531L7.46967 14.9509L8 15.4812L8.53033 14.9509L14.6059 8.87531C16.4647 7.01653 16.4647 4.00286 14.6059 2.14408C12.7884 0.326509 9.86653 0.286221 8 2.02321Z" 
            fill="currentColor"></path>
        </svg>
    )
}
export function HeartFill({ height = 16, width = 16, color = "currentColor" }) {
    return (
        <svg 
        data-testid="geist-icon" 
        height={ height } 
        strokeLinejoin="round" 
        style={{ color }} 
        viewBox="0 0 16 16" 
        width={ width }>
            <path 
            d="M1.39408 2.14408C3.21165 0.326509 6.13348 0.286219 8 2.02321C9.86652 0.286221 12.7884 0.326509 14.6059 2.14408C16.4647 4.00286 16.4647 7.01653 14.6059 8.87531L8 15.4812L1.39408 8.87531C-0.464691 7.01653 -0.464694 4.00286 1.39408 2.14408Z" 
            fill="currentColor"></path>
        </svg>
    )
}