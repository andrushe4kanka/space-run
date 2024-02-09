import React, { useState, useRef } from 'react';
import {     
  StyleSheet, 
  View
} from 'react-native';
import Logo from '../components/form/Logo'
import Header from '../components/form/Header'
import BackButton from '../components/form/BackButton'
import { theme } from '../core/theme'
import { videos } from '../utils/constants';
import AuthBackground from '../components/form/AuthBackground';
import SignUpForm from '../components/form/SignUpForm';
import VerificationForm from '../components/form/VerificationForm';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import SignInForm from '../components/form/SignInForm';

const firebaseConfig = {
  apiKey: "AIzaSyB3fHutRwFwwzp2_UUeOEH06kQzeUg8c8w",
  authDomain: "space-run-9e906.firebaseapp.com",
  projectId: "space-run-9e906",
  storageBucket: "space-run-9e906.appspot.com",
  messagingSenderId: "667534294321",
  appId: "1:667534294321:web:d440757aa46f6404510410"
};

const SignInWithOtp = (props) => {
    const { navigation } = props;
    const [isVerifying, setIsVerifying] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null)
    const recaptchaVerifier = useRef(null);

    return (
      <View style={styles.background}>
        <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
        />
        <AuthBackground speed={1}/>
        <View style={styles.container}>
          <BackButton goBack={navigation.goBack} />
          <Logo />
          <Header>Welcome back.</Header>
          {isVerifying ? 
            <VerificationForm {...props} confirmationResult={confirmationResult} setIsVerifying={setIsVerifying}/>
            :
            <SignInForm {...props} setConfirmationResult={setConfirmationResult} setIsVerifying={setIsVerifying} recaptchaVerifier={recaptchaVerifier}/>
          }
        </View>
      </View>
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

export default SignInWithOtp;