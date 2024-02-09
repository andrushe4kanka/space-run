import React from 'react';
import {     
  StyleSheet, 
  View,
  TouchableOpacity
} from 'react-native';
import { getAuth,  RecaptchaVerifier } from "firebase/auth";
import { Formik } from 'formik';
import { Text } from 'react-native-paper'
import Button from './Button'
import { theme } from '../../core/theme'
import OtpTextInput from 'react-native-text-input-otp'

const VerificationForm = ({ navigation, setUser, confirmationResult, setIsVerifying }) => {
    const [otp, setOtp] = React.useState('');

    const verifyCode = async (code) => {
        if (confirmationResult) {
          try {
            const userCredential = await confirmationResult.confirm(code);
            setUser(userCredential)
            setIsVerifying(false)
          } catch (error) {
          }
        } else {
        }
      };
  
    return (
        <Formik
          initialValues={{ code: '', }}
          onSubmit={values => signIn(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.formContainer}>
                <OtpTextInput 
                    otp={ otp }
                    setOtp={ setOtp }
                    digits={6} 
                />
                <Button
                    mode="contained"
                    onPress={() => verifyCode(otp)}
                    style={{ marginTop: 24 }}
                >
                Verify code
              </Button>
            </View>
          )}
        </Formik>
    )
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    position: 'relative',
    flex: 1,
    marginTop: 0,

    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default VerificationForm;