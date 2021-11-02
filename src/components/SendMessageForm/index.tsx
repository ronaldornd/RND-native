import React, {useState} from 'react';

import { Alert, Keyboard, TextInput, View } from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm(){
    const [message, setMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false)
  async function handleMessageSubmit() {
    const messageFormatted = message.trim();
    await api.post('/messages', {message: messageFormatted});

    setMessage('');
    Keyboard.dismiss();
    setSendingMessage(true);
    Alert.alert('Mensagem enviada!')

    if(messageFormatted.length>0){
      setSendingMessage(false)
    }else{
      alert("Digite algo! duh")
    }
  }
  return (
    <View>
        <TextInput
            placeholder="Insira seu recado aqui!"
            placeholderTextColor={COLORS.GRAY_PRIMARY}
            multiline
            maxLength={140}
            onChangeText={setMessage}
            value={message}
            style={styles.input}
            editable={!sendingMessage}
        />
        <Button
            title="Enviar Message"
            backgroundColor= {COLORS.RED}
            color= {COLORS.WHITE}
            isLoading={sendingMessage}
            onPress={handleMessageSubmit}
        />
    </View>
  );
}