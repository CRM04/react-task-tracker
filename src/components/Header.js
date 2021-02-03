import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from "react-router-dom";

const Header = ({ title, onShow, showForm }) => {
    const location = useLocation();

    console.log(location);
    return (
        <header className='header'>
            <h1 > {title} </h1>
            { location.pathname === '/' && <Button color={ showForm ? 'red' : 'green' } text={ showForm ? 'Close' : 'Add'} onClick={onShow} /> }
        </header>
    )
}

// CSS in JS
/* const HeadingStyle = {
    color: 'blue'
}
 */
Header.defaultProps = { 
    title: 'Hello'
}

Header.propTypes = {
    title: PropTypes.string,
    onShow: PropTypes.func,
    showForm: PropTypes.bool
}

export default Header
