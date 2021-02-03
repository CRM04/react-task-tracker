import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types'

const Task = ({ Task, onDelete, onToggle }) => {
    return (
        <div className={`task ${Task.reminder ? 'reminder' : ''}` } onDoubleClick={() => onToggle(Task.id)}>
            <h3> {Task.text} <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(Task.id)} /> </h3>
            <p> {Task.day} </p>
        </div>
    )
}

Task.propTypes = {
    Task: PropTypes.object,
    onDelete: PropTypes.func
}

export default Task
