import { Audio } from 'react-loader-spinner'

function Loader() {
  return (

 <div className="absolute inset-0 flex items-center justify-center">
      <Audio
       height="60"
width="60"
color="#452E5A"
ariaLabel="audio-loading"
wrapperClass="wrapper-class"
visible={true}
      />
    </div>
  )
}
export default Loader;