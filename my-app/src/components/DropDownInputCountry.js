import React from 'react'

function DropDownInputCountry ({country, setCountry}) {
const handleSubmit = (event) => {
  setCountry(event.target.value)
}
  return (
    <div className="flex flex-col justify-start gap-1">
      <label className="font-bold  text-lg ml-[20px]">Country</label>
      <div
        htmlFor="options"
        className="mx-5 rounded-lg h-[40px] flex items-center "
      >
        <select
          id="option"
          value={country}
          onChange={handleSubmit}
          className="w-full h-full rounded-2xl"
        >
          <option value=""></option>
          
    <option value="AF">Afghanistan</option>
    <option value="AM">Armenia</option>
    <option value="AZ">Azerbaijan</option>
    <option value="BH">Bahrain</option>
    <option value="BD">Bangladesh</option>
    <option value="BT">Bhutan</option>
    <option value="IO">British Indian Ocean Territory</option>
    <option value="BN">Brunei Darussalam</option>
    <option value="KH">Cambodia</option>
    <option value="CN">China</option>
    <option value="CX">Christmas Island</option>
    <option value="CC">Cocos (Keeling) Islands</option>
    <option value="CY">Cyprus</option>
    <option value="GE">Georgia</option>
    <option value="HK">Hong Kong</option>
    <option value="IN">India</option>
    <option value="ID">Indonesia</option>
    <option value="IR">Iran, Islamic Republic of</option>
    <option value="IQ">Iraq</option>
    <option value="IL">Israel</option>
    <option value="JP">Japan</option>
    <option value="JO">Jordan</option>
    <option value="KZ">Kazakhstan</option>
    <option value="KP">Korea, Democratic People's Republic of</option>
    <option value="KR">Korea, Republic of</option>
    <option value="KW">Kuwait</option>
    <option value="KG">Kyrgyzstan</option>
    <option value="LA">Lao People's Democratic Republic</option>
    <option value="LB">Lebanon</option>
    <option value="MO">Macao</option>
    <option value="MY">Malaysia</option>
    <option value="MV">Maldives</option>
    <option value="MN">Mongolia</option>
    <option value="MM">Myanmar</option>
    <option value="NP">Nepal</option>
    <option value="OM">Oman</option>
    <option value="PK">Pakistan</option>
    <option value="PS">Palestinian Territory, Occupied</option>
    <option value="PH">Philippines</option>
    <option value="QA">Qatar</option>
    <option value="RU">Russian Federation</option>
    <option value="SA">Saudi Arabia</option>
    <option value="SG">Singapore</option>
    <option value="LK">Sri Lanka</option>
    <option value="SY">Syrian Arab Republic</option>
    <option value="TW">Taiwan, Province of China</option>
    <option value="TJ">Tajikistan</option>
    <option value="TH">Thailand</option>
    <option value="TL">Timor-Leste</option>
    <option value="TR">Turkey</option>
    <option value="TM">Turkmenistan</option>
    <option value="AE">United Arab Emirates</option>
    <option value="UZ">Uzbekistan</option>
    <option value="VN">Viet Nam</option>
    <option value="YE">Yemen</option>
        </select>
      </div>
    </div>
  )
}

export default DropDownInputCountry