import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState , useRef, useEffect } from 'react';
import { Button,  Text, TouchableOpacity, View , Modal,Image} from 'react-native';
import * as MediaLibrary from "expo-media-library"
import {styles} from './styles'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CameraV() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission , setMediaPermission] = useState<boolean>(false);

  useEffect(()=>{
    (async()=>{
        const {status} = await MediaLibrary.requestPermissionsAsync();
        setMediaPermission(status === "granted")
    })();
  },[])

  const [capturedPhoto , setCapturedPhoto]= useState<string | null>();
  const [modalIsOpen , setModalIsOpen] = useState<boolean>(false);

  const camRef = useRef<CameraView>(null);

  if (!permission) {
    return <View><Text>Não tem permissão de Camera</Text></View>;
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

    const options = {quality:1};

    if(camRef && camRef.current){
        const data = await camRef.current.takePictureAsync();

        setCapturedPhoto(data.uri);
        setModalIsOpen(true);
        
    }
  }

  async function  savePicture(){
    if(capturedPhoto != null){
        MediaLibrary.saveToLibraryAsync(capturedPhoto).then(()=>{
            setCapturedPhoto(null);
        })
    }
  }

  if(mediaPermission === false || null){
    return <View><Text>Não tem permissão de midia</Text></View>
  }
  return (
    <View style={styles.container}>
      <CameraView  ratio='16:9' style={styles.camera} facing={facing} ref={camRef}>
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
                            <View style={{flexDirection:"row"}}>
                                <TouchableOpacity style={{margin:10}} onPress={()=>{setModalIsOpen(false)}}>
                                     <Text>X</Text>
                                </TouchableOpacity >

                                <TouchableOpacity style={{margin:10}} onPress={()=>{savePicture()}}>
                                    <Text>Save</Text>
                                </TouchableOpacity>
                            </View>
                            <Image style={{width:"100%",height:"80%",borderRadius:20}} source={{uri:capturedPhoto}}></Image>
                        </View>
                    </Modal>  
                )}  
              
        </View>
      </CameraView>
    </View>
  );
}

