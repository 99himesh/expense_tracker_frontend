import { Audio } from 'react-loader-spinner'

function CustomLoader() {
  return (

      <Audio
       height="60"
width="60"
color="#452E5A"
ariaLabel="audio-loading"
wrapperClass="wrapper-class"
visible={true}
      />
  )
}
export default CustomLoader;