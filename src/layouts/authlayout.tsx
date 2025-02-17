import React, {ReactNode} from 'react'
import AuthImage from '../assets/auth-image.png'


interface LayoutProps {
    children: ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="container flex items-center justify-center md:gap-10 md:px-28 md:py-20 h-screen">
        <div className=" hidden md:block image flex-[.5]">
            <img src={AuthImage} alt="auth-image" />
        </div>
        <div className="form-area flex-[1] md:flex-[.5] flex flex-col items-center">
            {children}
        </div>
    </div>
  )
}

export default AuthLayout