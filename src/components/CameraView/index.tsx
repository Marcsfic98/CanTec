import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState , useRef } from 'react';
import { Button,  Text, TouchableOpacity, View , Modal,Image} from 'react-native';
import {styles} from './styles'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CameraV() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const [capturedPhoto , setCapturedPhoto]= useState<string | null>()
  const [modalIsOpen , setModalIsOpen] = useState<boolean>(false)

  const camRef = useRef<CameraView>(null)

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if(camRef && camRef.current){
        const data = await camRef.current.takePictureAsync();

        setCapturedPhoto(data.uri)
        setModalIsOpen(true)
        
    }
  }

  return (
    <View style={styles.container}>
      <CameraView ratio='16:9' style={styles.camera} facing={facing} ref={camRef}>
        <View style={styles.buttonContainer}>

                 <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <MaterialIcons  name="camera" size={40} color="white" />
                </TouchableOpacity>
          
            
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <FontAwesome6  name="arrows-rotate" size={40} color="white" />
                </TouchableOpacity>
                    
                {capturedPhoto && (
                    <Modal animationType='slide' transparent={false} visible={modalIsOpen}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"center",margin:20}}>
                            <TouchableOpacity style={{margin:10}} onPress={()=>{setModalIsOpen(false)}}>
                                <Text>X</Text>
                            </TouchableOpacity>
                            <Image style={{width:"100%",height:300,borderRadius:20}} source={{uri:capturedPhoto}}></Image>
                        </View>
                    </Modal>  
                )}  
              
        </View>
      </CameraView>
    </View>
  );
}

