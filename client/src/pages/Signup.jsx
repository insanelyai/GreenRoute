import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (selectedOption) => {
    setFormData({ ...formData, role: selectedOption.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'xyz', label: 'XYZ' }
  ];

  const inputContainerStyle = 'relative mb-5';
  const inputStyle = 'w-full pl-10 pr-4 py-3 border border-solid border-green-300 focus:outline-none focus:border-green-600 text-[16px] leading-7 text-headingColor placeholder:text-gray-400 rounded-md transition-colors duration-300 ease-in-out';
  const iconStyle = 'absolute left-3 top-3 text-green-400';

  return (
    <section className='flex items-center justify-center min-h-screen px-5 xl:px-0 bg-green-50'>
      <div className="w-full max-w-[570px] mx-auto bg-white rounded-lg shadow-lg p-8 md:p-10">
        <div className="grid">
          <div className="rounded-l-lg lg:px-8 py-10">
            <h3 className="text-green-800 text-[22px] leading-9 font-bold mb-10">
              Create an <span className='text-green-600'>account</span>
            </h3>

            <form onSubmit={submitHandler}>


              <div className={inputContainerStyle}>
                <FaEnvelope className={iconStyle} />
                <input
                  type="email"
                  name="email"
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${inputStyle} hover:border-green-600 hover:bg-green-50 focus:bg-green-100`}
                  required
                />
              </div>

              <div className={inputContainerStyle}>
                <FaLock className={iconStyle} />
                <input
                  type="password"
                  name="password"
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${inputStyle} hover:border-green-600 hover:bg-green-50 focus:bg-green-100`}
                  required
                />
              </div>


              <div className="mb-5">
                <label className='text-green-800 font-bold text-[16px] leading-7 mb-2'>
                  Are you a:
                </label>
                <Select
                  options={roleOptions}
                  defaultValue={roleOptions[0]}
                  onChange={handleRoleChange}
                  className='text-green-800 font-semibold text-[15px] leading-7'
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderColor: '#86EFAC',
                      ':hover': {
                        borderColor: '#16A34A',
                        backgroundColor: '#ECFDF5',
                      },
                      ':focus': {
                        borderColor: '#16A34A',
                        backgroundColor: '#ECFDF5',
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? '#ECFDF5' : null,
                      color: state.isFocused ? '#16A34A' : null,
                    }),
                  }}
                />
              </div>

              <div className="mt-7">
                <button
                  disabled={loading}
                  type='submit'
                  className="w-full bg-green-700 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 transition-transform duration-300 ease-in-out hover:bg-green-800 hover:scale-105"
                >
                  {loading ? <HashLoader size={35} color='#fff' /> : 'SignUp'}
                </button>
              </div>

              <p className="mt-5 text-green-800 text-center">
                Already have an account? <Link to='/login' className='text-green-600 font-medium ml-1 hover:underline'>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;