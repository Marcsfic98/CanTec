import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button,  Text, TouchableOpacity, View } from 'react-native';
import {styles} from './styles'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function CameraV() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

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
    console.log("tirou foto")
  }

  return (
    <View style={styles.container}>
      <CameraView ratio='16:9' style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>

                 <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <MaterialIcons  name="camera" size={40} color="white" />
                </TouchableOpacity>
          
            
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <FontAwesome6  name="arrows-rotate" size={40} color="white" />
                </TouchableOpacity>
                    
              
        </View>
      </CameraView>
    </View>
  );
}

