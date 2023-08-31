import React, { useEffect, useState } from 'react'

const Regestration = () => {



    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [Email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [dateofbirth, setDob] = useState("")
    const [image, setimage] = useState("")
    const [classname, setClassName] = useState("")
    const [Allclass, SetAllClass] = useState([])


    const handleClassChange =(event)=> {
        setClassName(event.target.value);
      };




    const ViewClass = () => {
        const requestOption = {
            method: "GET",
        };
        fetch("http://127.0.0.1:8000/backend/viewclasses/", requestOption)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                data = JSON.parse(data)
                console.log(data)
                SetAllClass(data)

            })
    }


    useEffect(() => {
        ViewClass()
    }, [1])


    const handleFileChange = (event) => {
        setimage(event.target.files[0]);
    }



    const regestration = () => {
        //    let input ={
        //     first_name :firstname , 
        //     last_name: lastname, 
        //     phone : phone , 
        //     email : Email ,
        //     password : password , 
        //     date_of_birth : dateofbirth , 
        //     image : image , 
        //     selected_class : classname
        //     }
        let profile_data = new FormData();
        const myimage = new File([image], `profile.jpeg`, { type: "image/jpeg" })
        profile_data.append("image", myimage)
        profile_data.append("first_name", firstname)
        profile_data.append("last_name", lastname)
        profile_data.append("phone", phone)
        profile_data.append("email", Email)
        profile_data.append("password", password)
        profile_data.append("date_of_birth", dateofbirth)
        profile_data.append("selected_class", classname)
        let requestOptions = {
            method: 'POST',
            body: profile_data
        }
        fetch("http://127.0.0.1:8000/backend/student_regester/", requestOptions)
            .then(response => response.json())
            .then(data => {
                alert("regestration_succcessfully")
            })

    }









    return (
        <div className='reg-div'>

            <h2>Regestration</h2>
            <form action="">
                <input type="text" placeholder='firstname' onChange={obj => setFirstName(obj.target.value)} />
                <br />
                <input type="text" placeholder='last_name' onChange={obj => setLastName(obj.target.value)} />
                <br />
                <input type="text" placeholder='phone' onChange={obj => setPhone(obj.target.value)} />
                <br />

                <input type="email" placeholder='email' onChange={obj => setEmail(obj.target.value)} />
                <br />

                <input type="password" placeholder='password' onChange={obj => setPassword(obj.target.value)} />
                <br />

                <input type="date" placeholder='dateofbirth' onChange={obj => setDob(obj.target.value)} />
                <br />
                {/* <input type="text" placeholder='' onChange={obj => set(obj.target.value)}  /> */}
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <br />
                                    <select className='select' value={classname} onChange={handleClassChange}>
                                        <option value="">Select a class</option>
                                        {Allclass.map(item => (
                                            <option key={item.pk} value={item.pk}>
                                                {item.fields.class_name}
                                            </option>
                                        ))}
                                    </select>
                <br />
                <button onClick={regestration}>Regester</button>







            </form>
        </div>
    )
}


export default Regestration