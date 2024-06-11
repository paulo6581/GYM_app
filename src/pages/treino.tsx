import React,{useState,useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View,ImageBackground,Text,TouchableOpacity,Image,Modal,TextInput} from "react-native";


export function Treino({navigation ,route}: {navigation:any, route: any}){
  const [info,setInfo]=useState<boolean>(false)
  const [repeticaoImput,setRepeticaoImput]=useState<string>("");
  const [serieImput,setSerieImput]=useState<string>("");
  const[cargaInput,setCargaInput]=useState<string>("");
  const [editarCarga,setEditarCarga]=useState<boolean>(false);
  const [data,setData]=useState<any[]>([])
  const { 

    id,
    rotinaId,
    nomeDoTreino,
    equipamento,
    imagem,
    serieRepeticao,
    serie,
    repeticao,
    carga,
    informacao,
    anotacao
  } = route.params;

useEffect(() => {
    obterDadosSalvos();
  }, []);
  
  const handleAdicionarTreinoNaRotina = () => {
    let updatedData;
    if (data.includes(id)) {
      console.log("Excluindo treino da lista");
      updatedData = data.filter(item => item !== id);
    } else {
      console.log("Adicionando treino na lista");
      updatedData = [...data, id];
    }
    setData(updatedData);
    saveData(updatedData);
   
  }

  const obterDadosSalvos = async()=>{
    const key = rotinaId;
    const dadosString= await AsyncStorage.getItem(key);
    if(dadosString){
      const dadosObtidos=JSON.parse(dadosString);
      setData(dadosObtidos);
    }
  }

    const saveData = async (item: any) => {
    setData(item);
    try {
      const key = rotinaId;
      const dadosJsonString = JSON.stringify(item);
      await AsyncStorage.setItem(key, dadosJsonString);
    } catch (error) {
      console.error('Não foi possível salvar os dados!');
    }
  };
  
  return(
    <View 
    style={{
      flex:1,
      backgroundColor:"#141414",
      alignItems:'center'
      }}>
      <Text>{id}{rotinaId}</Text>
      <ImageBackground 
      source={imagem}
      style={{width:400,height:400}}
      >
        <TouchableOpacity 
        onPress={()=>{setInfo(true)}}
        style={{
          position:"absolute",
          bottom:10,
          right:10,
          width:50,
          height:50,
          borderRadius:25,
          backgroundColor:'blue'
          }}/>
      </ImageBackground>
      <View 
      style={{ 
        flexDirection:'row',
        justifyContent:'space-between',
        width:'80%',
        marginVertical:20
        }}>
      
        {!editarCarga?(
          <>
           <View>
          <Text 
            style={{
              color:"white"
            }}>Serie e repetição
          </Text>

          <Text 
            style={{
              color:"white"
            }}>
            {serieRepeticao}
          </Text>

        </View>
        <View
        style={{
          marginHorizontal:10
          }}
        >
          <Text 
            style={{
              color:"white"
            }}>
            Carga
          </Text>
         
          <Text 
            style={{
              color:"white"
            }}>
            {carga}
          </Text>
        </View>
        </>
        ):(
          <>
          <View>
          <Text 
            style={{
              color:"white"
            }}>Serie e repetição
          </Text>

          <TextInput 
            style={{
              backgroundColor:'gray',
              fontSize:20,
              color:'white'
            }}
            placeholder={serieRepeticao}
            placeholderTextColor='white'
            onChangeText={(text:any) => setSerieImput(text)}
            value={serieImput}
            maxLength={5}
          />

          <TextInput 
            style={{
              backgroundColor:'gray',
              fontSize:20,
              color:'white'
            }}
            placeholder={repeticaoImput}
            placeholderTextColor='white'
            onChangeText={(text) => setRepeticaoImput(text)}
            value={repeticaoImput}
            maxLength={5}
          />
        </View>
        <View
        style={{
          marginHorizontal:10
          }}
        >
          <Text 
            style={{
              color:"white"
            }}>
            Carga
          </Text>
         
          <TextInput
            style={{
              color:"white"
            }}>
            {carga}
          </TextInput>
        </View>
        </>
        )}

{/*BOTÃO PARA EDITAR A CARGA E AS REPETIÇÕES */}
        
        <TouchableOpacity
        onPress={()=>{
          if(!editarCarga)setEditarCarga(true);
          else setEditarCarga(false);
        }}
        style={{
          width:60,
          height:60,
          margin:10,
          backgroundColor: '#0038a4',
          borderRadius: 30,
          padding: 10,
          alignItems:'center',
          justifyContent:"center"
        }}
        >
        {editarCarga?(
          <Image 
            style={{height:40,width:50}}
            source={require("../../component/imagens/check.png")}
          />
        ):(
          <Image 
            style={{height:50,width:50}}
            source={require("../../component/imagens/pen.png")}
          />
        )}
          
        </TouchableOpacity>
      </View>
      <Text 
      style={{
        color:"white"
      }}>{anotacao}</Text>

{/**BOTÃO PARA ADICONAR UM TREINO NA ROTINA */}

      <TouchableOpacity
      onPress={()=>{handleAdicionarTreinoNaRotina(); navigation.navigate('Home');}} 
      style={{
        width:50,
        height:50,
        backgroundColor:'blue',
        position:"absolute",
        bottom:10,
        right:10,
        borderRadius:25,
        }}/>
{/**modal de informação do treino */}
      <Modal 
      visible={info}
      transparent={true}
      >
      <TouchableOpacity
      onPress={()=>{setInfo(false)}}
      style={{width:'100%',height:200,backgroundColor:'rgba(0,0,0,0.7)'}}
      />
      <View
      style={{flexDirection:'row',justifyContent:"space-between"}}
      >
      <TouchableOpacity
      onPress={()=>{setInfo(false)}}
      style={{width:'10%',height:'100%',backgroundColor:'rgba(0,0,0,0.7)'}}
      />

      <View
        style={{
          backgroundColor:"#353535",
          borderRadius:13,
          padding:20,
          width:'80%',
          minHeight:200,
        }}
      >
      <View style={{flexDirection:'row-reverse'}}>
        <TouchableOpacity
        onPress={()=>{setInfo(false)}}
        style={{
          width:40,
          height:40,
          borderRadius:20,
          backgroundColor:'red',
          alignItems:'center',
          justifyContent:'center',
          padding:5
          }}
        >
        <Text style={{color:'white',textAlign:'center',fontSize:25}}>X</Text>
        </TouchableOpacity>
      </View>
      
        <TextInput
          style={{
            fontSize:20,
            color:'white',
            fontFamily:'RoundedMplus1c-Bold',
            }}
        >
          {informacao}
        </TextInput>
      </View>

      <TouchableOpacity
      onPress={()=>{setInfo(false)}}
      style={{width:'10%',height:'100%',backgroundColor:'rgba(0,0,0,0.7)'}}
      />
      </View>
      <TouchableOpacity
      onPress={()=>{setInfo(false)}}
      style={{width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.7)'}}
      />
      
      </Modal>
    </View>
  );
}
