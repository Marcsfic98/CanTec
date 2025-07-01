
import { StyleSheet, View } from 'react-native';
import CameraV from './src/components/CameraView';

export default function App() {

  

 return (
    <View style={styles.container}>
        <CameraV/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});