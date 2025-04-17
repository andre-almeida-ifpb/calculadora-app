import { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import {useWindowDimensions} from 'react-native';
import BotaoArredondado from "@/componentes/BotaoArredondado";

import BigNumber from "bignumber.js";

export default function Index(): JSX.Element {
  const largura: number = useWindowDimensions().width;
  const altura: number = (largura/4) * 5;

  const [visor, setVisor] = useState<string>('');
  const [n1, setN1] = useState<string | undefined>(undefined);
  const [n2, setN2] = useState<string | undefined>(undefined);
  const [op, setOp] = useState<string | undefined>(undefined);

  function inserirNumero(digito: number): void {
    if (op == undefined) {
      if (n1 == undefined) {
        setN1(digito.toString());
      } else {
        setN1(n1 + digito.toString());
      }
      
    } else {
      if (n2 == undefined) {
        setN2(digito.toString());
      } else {
        setN2(n2 + digito.toString());
      }
      
    }
    setVisor(visor + digito.toString());
  }

  function definirOperador(op: string): void {
    if (n1 != undefined) {
      setOp(op);
      setVisor(visor + op);
    }
  }

  function calcular(): void {
    if (n1 != undefined && n2 != undefined) {

      if (op == '/' && n2 == '0') {
        Alert.alert('Não é possível dividir por zero!');
        return;
      }

      let resultado = undefined;
      const bigNumber1 = new BigNumber(n1);
      const bigNumber2 = new BigNumber(n2);

      if (op == '+') {
        resultado = bigNumber1.plus(bigNumber2);
      } else if (op == '-') {
        resultado = bigNumber1.minus(bigNumber2);
      } else if (op == '*') {
        resultado = bigNumber1.multipliedBy(bigNumber2);
      } else if (op == '/') {
        resultado = bigNumber1.dividedBy(bigNumber2);
      } else {
        resultado = bigNumber1.pow(bigNumber2);
      }

      setVisor( resultado.toString() );
      setN1(resultado.toString());
      setN2(undefined);
      setOp(undefined);
    }
  }

  function limpar(): void {
    setN1(undefined);
    setN2(undefined);
    setOp(undefined);
    setVisor('');
  }

  function removerUltimo(): void {

    if (n1 != undefined) {
    
      if (n2 != undefined) {
        if (n2.length == 1) {
          setN2(undefined)
        } else {
          setN2(n2.substring(0, n2.length-1));
        }

      } else if (op != undefined) {
        setOp(undefined);
        
      } else {
        if (n1.length == 1) {
          setN1(undefined)
        } else {
          setN1(n1.substring(0, n1.length-1));
        }
      }

      setVisor(visor.substring(0,visor.length-1));
    }
  }

  function inserirVirgula(): void {
    if (op == undefined) {
      if (n1 != undefined) {
        setN1(n1 + '.');
        setVisor(visor + '.');
      }
      
    } else {
      if (n2 != undefined) {
        setN2(n2 + '.');
        setVisor(visor + '.');
      }
    }
  }

  return (
    <View style={ styles.container }>
      <StatusBar hidden />
      <View style={ [ styles.display, { width: largura - 20 } ] }>
        <Text style={ styles.texto }>{visor}</Text>
      </View>
      <View style={{ width: largura, height: altura }}>
        <View style={{ height: altura/5, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <BotaoArredondado title="C"   color="#aaaaaa" size={altura/5 - 10} onPress={ () => limpar() }/>
          <BotaoArredondado title="x^y" color="#aaaaaa" size={altura/5 - 10} onPress={ () => definirOperador('^') } />
          <BotaoArredondado title="<"   color="#aaaaaa" size={altura/5 - 10} onPress={ () => removerUltimo() }/>
          <BotaoArredondado title="/"   color="#aaaaaa" size={altura/5 - 10} onPress={ () => definirOperador('/') } />
        </View>
        <View style={{ height: altura/5, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <BotaoArredondado title="7" color="#aaaaaa" size={altura/5 - 10} onPress={ () => inserirNumero(7) } />
          <BotaoArredondado title="8" color="#aaaaaa" size={altura/5 - 10} onPress={ () => inserirNumero(8) } />
          <BotaoArredondado title="9" color="#aaaaaa" size={altura/5 - 10} onPress={ () => inserirNumero(9) } />
          <BotaoArredondado title="X" color="#aaaaaa" size={altura/5 - 10} onPress={ () => definirOperador('*') } />
        </View>
        <View style={{ height: altura/5, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <BotaoArredondado title="4" color="#aaaaaa" size={altura/5 - 10} onPress={ () => inserirNumero(4) } />
          <BotaoArredondado title="5" color="#aaaaaa" size={altura/5 - 10} onPress={ () => inserirNumero(5) } />
          <BotaoArredondado title="6" color="#aaaaaa" size={altura/5 - 10} onPress={ () => inserirNumero(6) } />
          <BotaoArredondado title="-" color="#aaaaaa" size={altura/5 - 10} onPress={ () => definirOperador('-') } />
        </View>
        <View style={{ height: altura/5, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <BotaoArredondado title="1" color="#aaaaaa" size={altura/5 - 10} onPress={ () => inserirNumero(1) } />
          <BotaoArredondado title="2" color="#aaaaaa" size={altura/5 - 10} onPress={ () => inserirNumero(2) } />
          <BotaoArredondado title="3" color="#aaaaaa" size={altura/5 - 10} onPress={ () => inserirNumero(3) } />
          <BotaoArredondado title="+" color="#aaaaaa" size={altura/5 - 10} onPress={ () => definirOperador('+') } />
        </View>
        <View style={{ height: altura/5, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <BotaoArredondado title="=" color="#aaaaaa" size={altura/5 - 10} onPress={ () => calcular() } />
          <BotaoArredondado title="0" color="#aaaaaa" size={altura/5 - 10} onPress={ () => inserirNumero(0) } />
          <BotaoArredondado title="," color="#aaaaaa" size={altura/5 - 10} onPress={ () => inserirVirgula()} />
          <BotaoArredondado title="=" color="#aaaaaa" size={altura/5 - 10} onPress={ () => calcular() }/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

display: {
  backgroundColor: 'gray',  
  paddingVertical: 20, 
  paddingHorizontal: 10, 
  marginBottom: 20
},

texto: { 
  fontSize: 40, 
  textAlign: 'right' 
}

})
