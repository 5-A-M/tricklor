import "./Account.sass"
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom"

const Account =(props)=> {
    return (
        <Link to="/account" className="link-to-account" >
            <div className="account-menu">
                <Name {...props} />
                <Balance {...props} />
                <Promotion {...props} />
            </div>
        </Link>
    )
}

const Name= (props)=> {
    return (
        <div className="name-account-menu">
            <div className="wrapper-name-account-menu-icon">
                <PersonIcon />
            </div>
            <div className="main-name-account-menu-icon">{props.name}</div>
        </div>
    )
}

const Balance= (props)=> {
    return (
        <div className="balance-account-menu">
            <span className="span-balance-account-menu">Số dư: </span>
            <strong className="strong-balance-account-menu">{props.price}</strong>
            <span className="span-balance-account-menu">VNĐ</span>
        </div>
    )
}

const Promotion= (props)=> {
    return (
        <div className="promotion-account-menu">
            <span className="span-balance-account-menu">Khuyến mãi: </span>
            <strong className="strong-balance-account-menu">{props.promotion}</strong>
            <span className="span-balance-account-menu">VNĐ</span>
        </div>
    )
}

export default Account