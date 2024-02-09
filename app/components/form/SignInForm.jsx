import React, { useState, useEffect, useRef } from 'react';
import {     
  StyleSheet, 
  View,
  TouchableOpacity
} from 'react-native';
import { signInWithPhoneNumber, getAuth } from "firebase/auth";
import { Formik } from 'formik';
import { Text } from 'react-native-paper'
import Button from './Button'
import TextInput from './TextInput'
import { theme } from '../../core/theme';
import { app } from '../../../firebaseConfig'

const SignInForm = ({ navigation, setIsVerifying, setConfirmationResult, recaptchaVerifier }) => {


    const loginWithPhoneNumber = async (values) => {
        const auth = getAuth()
        const result = await signInWithPhoneNumber(
          auth,
          values.phone,
          recaptchaVerifier.current
        );
        setConfirmationResult(result);
        setIsVerifying(true);
      };
  
    return (
        <Formik
          initialValues={{ phone: '', }}
          onSubmit={values => loginWithPhoneNumber(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.formContainer}>
              <TextInput
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                placeholder="Phone number"
                keyboardType="phone-pad"
                returnKeyType="next"
                error={!!errors.phone}
                errorText={errors.phone}
                autoCapitalize="none"
                autoCompleteType="tel"
              />
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={{ marginTop: 24 }}
              >
                Sign In
              </Button>
              <View style={styles.row}>
                    <Text>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('Sign Up')}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
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

export default SignInForm;