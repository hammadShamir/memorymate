import {React,useState} from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// images
import loading from '../images/loading.gif'

import '../cssfiles/remainder.css'

const Remainder = () => {

  const [isBtnDisabled,setisButtonDisabled] = useState(false);
  const [loadImg ,setLoadImg] = useState(false);

  const handleRemainder = async (e) => {
    e.preventDefault()
    const { medicationName, dosage, frequency, time, startDate,endDate } = e.target.elements;


    try {
        setisButtonDisabled(true);
        setLoadImg(true);





        //your adding to firebase code here








        toast.success(`Medication ${medicationName.value} added Successfully!`);
        setLoadImg(false);
        setisButtonDisabled(false);

    } catch (error) {
        toast.error('Failed to add Medication');
        setLoadImg(false);
        setisButtonDisabled(false);
    }
}


  return (
   < div className="formbold-main-wrapper">
  <div className="formbold-form-wrapper">
    <div className="formbold-form-title">
        <h3>Medication Remainder</h3>
        <p>Keep your health on track with our reminder.<br/> Never forget a dose again with our app</p>
    </div>
    <form onSubmit={handleRemainder} style={{position:`relative`}}>

        <div className="formbold-mb-3">
            <div>
              <label htmlFor="medicationName" className="formbold-form-label">Medication Name </label>
              <input
                type="text"
                name="medicationName"
                id="medicationName"
                className="formbold-form-input"
                placeholder='Enter your medication name...'
                
              />
            </div>
        </div>

        <div className="formbold-input-flex">
            <div title='Specify the amount of medication you need to take each time.'>
                <label  htmlFor="Dosage" className="formbold-form-label">Dosage Amount </label>
                <input type="text" name="dosage" id="Dosage" placeholder='Dosage...' className="formbold-form-input" />
            </div>
            <div title='Specify how often you need to take medication e.g. daily, weekly, monthly, etc.'>
                <label htmlFor="Frequency" className="formbold-form-label">Frequency </label>
                <input type="text" name="frequency" id="Frequency" className="formbold-form-input" placeholder='Frequency...' />
            </div>
        </div>

        <div className="formbold-mb-3" title=' Specify the time of day you need to take medication'>
            <div>
              <label htmlFor="time" className="formbold-form-label">Medication Time </label>
              <input
                type="time"
                name="time"
                id="time"
                className="formbold-form-input"
                placeholder='Medication time...'
                
              />
            </div>
        </div>

        <div className="formbold-input-flex">
            <div title='Enter the date you want to start taking the medication.'>
                <label  htmlFor="startDate" className="formbold-form-label">Start Date </label>
                <input type="date" name="startdate" id="startDate" placeholder='Start Date...' className="formbold-form-input" />
            </div>
            <div title='Enter the date you want to stop taking the medication.'>
                <label htmlFor="endDate" className="formbold-form-label">End Date </label>
                <input type="date" name="enddate" id="endDate" className="formbold-form-input" placeholder='End Date...' />
            </div>
        </div>


        <button style={{background: isBtnDisabled ? `gray` : `#91c3db`,cursor: isBtnDisabled ? `wait`: ``}} className="formbold-btn">
            Add Remainder
        </button>
        <img src={loading} style={{position:`absolute`,top:`50%`,left:`50%`,transform:`translate(-50%,-50%)`,display: loadImg ? `flex`:`none` }}/>
    </form>
    <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
  </div>
</div>
  )
}

export default Remainder