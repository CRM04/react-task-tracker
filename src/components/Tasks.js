import Task from './Task'
import PropTypes from 'prop-types'

const Tasks = ({ tasks, onDelete, onToggle }) => {

    return (
        <>
            {
                tasks.map((task) => (
                    <Task key={task.id} Task={task} onDelete={onDelete} onToggle={onToggle}/>
                ))
            }
        </>
    )
};

Tasks.propTypes = {
    tasks: PropTypes.array,
    onDelete: PropTypes.func,
    onToggle: PropTypes.func
}

export default Tasks
