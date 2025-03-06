import { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'
import Slider from '@react-native-community/slider'
import { ModalPassword } from '../../components/modal'

let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

export function Home() {
    // Está criando algo mutável na aplicação, para poder mudar o valor do slider. Pode trocar o valor com base em alguma ação
    // O primeiro parâmetro Size é o nome do noso useState e o segundo parâmetro setSize é basicmanete um thisPatch a ação que a gente pode chamar para trocar o valor do nosso useState.
    const [size, setSize] = useState(10)
    const [passwordValue, setPasswordValue] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    function generatePassword() {
        let password = "";

        for (let i = 0, n = charset.length; i < size; i++) {
            password += charset.charAt(Math.floor(Math.random() * n))
        }

        setPasswordValue(password)
        setModalVisible(true)
    }


    return (
        <View style={styles.container}>
            {/* Icone de cadeado */}
            <Image source={require("../../assets/logo.png")} style={styles.logo} />

            {/* Texto em baixo do ícone de cadeado */}
            <Text style={styles.title}>{size} caracteres</Text>

            {/* Espaço em branco para o Slider ir dentro */}
            <View style={styles.area}>
                {/* Slider para ter o valor mínimo de 6 e máximo de 20 */}
                {/* MaximumTrackTintColor e MinimumTrackTintColor para mudar a cor da linha antes de aumentar e depois de aumentar */}
                {/* Thumb tintColor para mudar a cor da bolinha do slider */}
                {/* Math.floor serve para arredondar o valor para o inteiro mais próximo, 
        pois o valor do slider é um float e a gente precisa de um valor inteiro para a senha */}
                <Slider style={{ height: 50 }} minimumValue={6} maximumValue={20} maximumTrackTintColor='#FF0000' minimumTrackTintColor='#000' thumbTintColor='#392DE9' value={size} onValueChange={(value) => setSize(Math.floor(value))}>

                </Slider>
            </View>

            <TouchableOpacity style={styles.button} onPress={generatePassword}>
                <Text style={styles.buttonText}>Gerar Senha</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType='fade' transparent={true}>
                <ModalPassword password={passwordValue} handleClose={() => setModalVisible(false)} />
            </Modal>
        </View>
    )
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3FF",
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginBottom: 80
    },
    area: {
        marginTop: 14,
        marginBottom: 14,
        width: "80%",
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 8
    },
    button: {
        backgroundColor: "#392DE9",
        width: "80%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 18
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})