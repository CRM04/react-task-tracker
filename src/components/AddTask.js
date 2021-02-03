import { useState } from "react";
import PropTypes from 'prop-types'


const AddTask = ({ onAddTask }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault()
        if (!text) {
            alert('Text is required')
            return
        }

        onAddTask({ text, day, reminder });

        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type="text" placeholder='Task' value={text} onChange={e => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day & time </label>
                <input type="text" placeholder='Day & time' value={day} onChange={e => setDay(e.target.value)} />
            </div>
            <div className='from-control form-control-check'>
                <label>Set reminder</label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={e => setReminder(e.currentTarget.checked)} />
            </div>
            <input type="submit" value="Save Task" className='btn btn-block' />
        </form>
    )
}

AddTask.propTypes = {
    onAddTask: PropTypes.func.isRequired
}

export default AddTask
