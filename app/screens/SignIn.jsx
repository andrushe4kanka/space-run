import React from 'react';
import { 
    StyleSheet, 
    View, 
    FlatList, 
    SafeAreaView, 
    TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper'
import Background from '../components/form/Background';
import Logo from '../components/form/Logo'
import Header from '../components/form/Header'
import Button from '../components/form/Button'
import TextInput from '../components/form/TextInput'
import BackButton from '../components/form/BackButton'
import { theme } from '../core/theme'
import { Formik } from 'formik';
import { videos } from '../utils/constants';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AuthBackground from '../components/form/AuthBackground';

const SignInScreen = ({ setUser, navigation }) => {
    const signIn = (values) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          setUser(user)
          console.log('User account signed in!', user);
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
  
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
  
          console.error(error);
        });
    };
  
    return (
    <View style={styles.background}>
        <AuthBackground url={videos.authBackground} speed={0.7}/>
        <View style={styles.container}>
        <BackButton goBack={navigation.goBack} />
          <Logo />
          <Header>Welcome back.</Header>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => signIn(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={styles.formContainer}>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Email"
                  returnKeyType="next"
                  error={!!errors.email}
                  errorText={errors.email}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />
                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Password"
                  returnKeyType="done"
                  error={!!errors.password}
                  errorText={errors.password}
                  secureTextEntry
                />
                  <Button mode="contained" onPress={handleSubmit}>
                      Login
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
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    forgot: {
      fontSize: 13,
      color: theme.colors.secondary,
    },
    link: {
      fontWeight: 'bold',
      color: 'blue',
    },
  })

export default SignInScreen;