import React, { useState } from 'react'

const AddClass = () => {

    const [classname, PickClassname] = useState("")
    const submit = () => {
        let input = {
            "classname": classname
        }

        let requestOption = {
            headers: { "Content-Type": 'application/json', },
            method: "POST",
            body: JSON.stringify(input)

        }
        fetch("http://127.0.0.1:8000/backend/addclass/", requestOption)
            .then(response => response.json())
            .then(data => {
                alert(data)
            })

    }





   







    return (





        <div className='class-form'>

            <form action="">
                <input type="text" onChange={obj => PickClassname(obj.target.value)} name="class" placeholder='className' />
                <button onClick={submit}>Submit</button>
            </form>
        </div>
    )
}

export default AddClass