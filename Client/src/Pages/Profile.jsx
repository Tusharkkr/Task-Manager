import React, { useRef, useState } from 'react'
import { useUserContext } from '../Utils/UserContext'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Profile = () => {

  const [image, setImage] = useState(null)  
  const { data } = useUserContext()
  const ipRef = useRef(null)
  const nav = useNavigate()

  const {
    username,
    firstName,
    lastName,
    profilePicture
  } = data


 

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center px-4 py-6 sm:px-6 sm:py-12">

        <div className="w-full max-w-2xl">

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

            {/* Cover */}
            <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-600" />

            {/* Profile Info */}
            <div className="px-5 pb-8 sm:px-8">

              {/* Avatar */}
              <div className="-mt-16 mb-5">
                <img
                  onClick={() => {
                    ipRef.current.click()
                  }}
                  src={
                    image || profilePicture ||
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAqAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAABgQFBwECA//EAD0QAAIBAgMDCAUKBwEAAAAAAAABAgMEBQYRITFBEhNRYYGRscEiU3Gh4RQVFiRDcqKy0fAjMlRiY5PxB//EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAaEQEBAQEBAQEAAAAAAAAAAAAAARECMSES/9oADAMBAAIRAxEAPwDtAAKgAAAAAAAAAAAA/e8AAAAAAAAAAAAAAAAAAAAAAAE1mnMPyDW0spJ3LXpz9X8fAQbXE8ZscMj9Zq/xPVw2y7uHaTN1navJtWlrCC4Oo+U/cS05zqTc6knKcnq5N6ts+TpOYzrf/S/FtdVKiurmzKts63UWvlNtSqLjyG4vzJYEyGumYXj9hiekKVTm6z+yqbH2cH2G1OPJ6PVNprc0WWV8ySqzhY4hU1k9FSqvj1P9SXnFlV4AMqAAAAAAAAAAAAAAAAwMcxBYZhla53zS5MF0ye79ew5fUnOrUnUqScpzblKT4tlZn+5fO2lonsUXUa9r0XgyRN8xmgANIAAAFs2rVPqAA6VlbE3iWGRdR616T5FTr6H2r3m3ILIty6WLToP+WtTez+5bV7uUXpzsytQABFAAAAAAAAAAAAAEBnvX57hru+Tx075E6V3/AKBbvnbW6S2OLpy79V5kidOfGaAAqAAAAADcZS1+f7XTr19mjOkkDkW2dXFp19PRo0nt63sXmXxjr1qAAMqAAAAAAAAAAAAAMDHMOWJ4bVttim/Spt8JL9+85fUpzpVJU6kXGcHyZRe9NHXyazRl13+t3ZRSuUvTh6z4+JqXEsQYPqcJU5uE4uM4vRxa0aZ8m2QAABv2cQk20ltbeiXSyzytlt0pRvsRhpJaSpUnvXW+vqJbjWNtlbDHhuGQVVaV6r5dTZu6F3G4AOdUAAAAAAAAAAAAAAAAAAGuxTBbHE19Zpen6yD0ku3j2k1d5Jrx1dpdU5rgqiafmWx+c7ijTWtSrTh96aRdqZqA+iOLp6cijp087sMq1yVdTkndXNKmv8esn5Fh842X9bbf7o/qfrTr0ai1p1ac/uzTH6qZGuwrALHDGp0abnW9ZU2vs6DagEv1QABQAAAAAAAAAAAAAB5KUYxcpNKKWrb2JEfjubWpSoYS+qVdr8q8xJpao8RxWzw2HKu60Yy3qC2yfYS1/nS4nrGwoRpR4Tqek+7d4kvUnOpNzqScpy3yk9Wz5Ok5Ss25xbEbpt17ytLq5Wi7kYT2vV7X0sAuMh6m4vWL0fSjwAZtri2IWjXMXlaOnDlaruZvrDOleGkb+3jVXGdP0X3bvAlATFjqeG4tZYnH6pWUpJbYPZJdhnHIKc505qdOTjOL1UovRorsBza240MV9kbhL8y80ZvKrEHkWpRUotOL2pramemVAAAAAAAADyUlGLlJqKS1be5I9I7OmMvV4ZbS4J15J/h8G/b7RJqWsHM2YpYhOVraScbSOxvjU+BOgHWRn0AAAAAAAAAAAAAUWWMwyw+cbW7k5Wknom/s/gX0WpRUotNNbGuJx8sMl4y21htzLg3QlJ/h81/wz1FlWIAMNAAAAADCxe/jhuH1bqWmsVpBPjJ7kctqVJ1akqlSTlOT1lJ8WVWfrzlVreyi9kFzk11vVL3a95JnTmM0ABUAAAAAAAAAAAAAA+qdSdKpGpTk4zg1KLXBo+QB1TB7+OJYfRuopJzWkl0SW9GaRWQrzk17iyk9k1zsF1rRP3eBanOzGoAAigAA5jmapKpj965PaqnJXsSSRrADpGAAFAAAAAAAAAAAAAAAAGzy1UlTx6ylB6N1OS/Y00zpwBz6agACK//Z"
                  }
                  alt="Profile"
                  className="
                    w-32 h-32
                    rounded-full
                    object-cover
                    border-4
                    border-white
                    shadow-md
                    bg-gray-200
                    cursor-pointer
                  "
                />








                <input 
                  onChange={(e) => {
                    // console.dir(e.target)
                    // setImage(e.target.files[0])
                    setImage(URL.createObjectURL(e.target.files[0])) // locally

                    const fd = new FormData()

                    fd.append("file", e.target.files[0])
                    fd.append("upload_preset", "OBN15Project")
                    
                    axios.post("https://api.cloudinary.com/v1_1/derddgaed/image/upload", fd)
                    .then((res) => {
                        // console.log(res.data.secure_url)

                        axios.patch(import.meta.env.VITE_BACKEND_URL + "/users/change-pp", {profilePicture : res.data.secure_url}, {withCredentials : true})
                        .then((res) => {
                            console.log(data.data)
                        })

                    })

                  }}
                  accept='image/*'
                  type="file" 
                  className='hidden' 
                  ref={ipRef}
                 />














              </div>

              {/* Name */}
              <div className="flex items-start justify-between">

                <div>
                  <h1 className="break-words text-xl font-bold text-gray-800 sm:text-2xl">
                    {firstName} {lastName}
                  </h1>

                  <p className="text-gray-500 mt-1">
                    @{username}
                  </p>
                </div>

                {/* <button
                  onClick={() => {
                    nav("/edit-profile")
                  }}
                  className="
                    px-4 py-2
                    rounded-lg
                    border border-gray-300
                    text-sm font-semibold
                    text-gray-700
                    hover:bg-gray-50
                    transition
                    cursor-pointer
                  "
                >
                  Edit Profile
                </button> */}

              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mt-7 pt-6">

                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Account
                </h2>

                <div className="mt-4 grid grid-cols-2 gap-4">

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500">
                      Username
                    </p>

                    <p className="mt-1 break-words font-medium text-gray-800">
                      @{username}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500">
                      Name
                    </p>

                    <p className="mt-1 break-words font-medium text-gray-800">
                      {firstName} {lastName}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Profile