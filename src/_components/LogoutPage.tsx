import React from 'react';
import { View, Button, TextInput, Text } from 'react-native';

interface ILogoutPage {
    Link: (e: string) => void;
}

const LogoutPage: React.FC<ILogoutPage> = ({Link}) => {

    return (
        <View>
            <View style={{
                justifyContent: 'center',
                flexDirection: 'column',
                margin: 16,

            }}>
                <View>
                    <Text>
                        Username
                    </Text>
                    <TextInput/>
                    <Text>
                        Password
                    </Text>
                    <TextInput  />
                </View>

                <Button onPress={() => Link('home')} title="login" />
            </View>
        </View>
    )
}


export default LogoutPage;