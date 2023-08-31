import React from 'react'
import { useState, useEffect } from 'react'

const Profile = () => {

  const token = localStorage.getItem("token")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [Email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dateofbirth, setDob] = useState("")
  const [image, setimage] = useState("")
  const [classname, setClassName] = useState("")
  const [Allclass, SetAllClass] = useState([])



  const handleClassChange = event => {
    setClassName(event.target.value);
  };


  const handleFileChange = (event) => {
    setimage(event.target.files[0]);
  }


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



  const ViewProfileData = () => {
    const requestOption = {
      method: "GET",
      headers: {
      Authorization: `Token ${token}`
      }
    }
    fetch(`http://127.0.0.1:8000/api/viewprofiledata/`, requestOption)
      .then(response => response.json())
      .then(data => {
        data = JSON.parse(data)
        console.log("ddddd",data)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email)
        setPhone(data.phone)
        setDob(data.date_of_birth)
        setimage(data.image)
        setClassName(data.class_enrolled)
      })
  }
  useEffect(() => {
    ViewClass();
    ViewProfileData()
  }, [1])


  const UpdateProfile = () => {
    const formData = new FormData();
    formData.append('first_name', firstname);
    formData.append('last_name', lastname);
    formData.append('date_of_birth', dateofbirth);
    formData.append('image', image);
    formData.append("selected_class", classname)
    formData.append("email", Email)
    formData.append("phone", phone)
    formData.append("password", password)

    const requestOption = {
      method: "PUT",
      headers: { 'Authorization': `Token ${token}` },
      body: formData
    }
    fetch("http://127.0.0.1:8000/api/updateprofile/", requestOption)
      .then(response => response.json())
      .then(data => {
        alert(data)
      })





  }
  return (
    <div className='profile-div'>
      <h2>Profile Page</h2>

    
      <div className='reg-div'>


        <form action="">
          <input type="text" placeholder='firstname' value={firstname} onChange={obj => setFirstName(obj.target.value)} />
          <br />
          <input type="text" placeholder='last_name' value={lastname} onChange={obj => setLastName(obj.target.value)} />
          <br />
          <input type="text" placeholder='phone' value={phone} onChange={obj => setPhone(obj.target.value)} />
          <br />

          <input type="email" placeholder='email' value={Email} onChange={obj => setEmail(obj.target.value)} />
          <br />

       

          <input type="date" placeholder='dateofbirth' value={dateofbirth} onChange={obj => setDob(obj.target.value)} />
          <br />
          <input type="file" accept="image/*"  onChange={handleFileChange} />
          <br />
          <select className='select' value={classname} onChange={handleClassChange}>
            <option >{classname}</option>
            {Allclass.map(item => (
              <option key={item.pk} value={item.fields.class_name}>
                {item.fields.class_name}    
              </option>
            ))}
          </select>
          <br />
          <button onClick={UpdateProfile}>Update</button>
        </form>
      </div>



    </div>
  )
}

export default Profile