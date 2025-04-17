import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface IBotaoProps {
  title: string,
  color: string,
  size?: number,
  onPress: () => void
}

export default function BotaoArredondado(props: IBotaoProps): JSX.Element {
  const title: string = props.title;
  const color: string = props.color;
  const size: number = props.size || 70;
  const onPress: () => void = props.onPress;
  
  return (
    <TouchableOpacity style={ [style.botao, {backgroundColor: color, width: size, height: size}] } onPress={ onPress }>
      <Text style={ style.texto }>{title}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({

botao: {
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center' 
},

texto: {
    fontSize: 20, 
    fontWeight: 'bold' 
}

})