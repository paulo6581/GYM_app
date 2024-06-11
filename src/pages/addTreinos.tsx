import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity, Image,Modal} from 'react-native';
import data from '../../component/dados';

const extractMuscleTypes = (data: any[]) => {
  let muscleTypes: { [key: string]: boolean } = {};
  data.forEach(item => {
    item.musculos.forEach((musculo: string|number) => {
      muscleTypes[musculo] = true;
    });
    item.tipo.forEach((tipo: string|number) => {
      muscleTypes[tipo] = true;
    });
  });
  return Object.keys(muscleTypes);
};



export function AddTreino({navigation,route}:{navigation:any,route:any}) {
  const {rotinaId,desc,indice} = route.params;
  const[filtro, setFiltro]= useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('');
  const [filterData, setFilterData] = useState<any[]>([]);
  const muscleTypes = extractMuscleTypes(data);

  const handleFiltro=()=>{
    if(filtro)setFiltro(false);
    else if(!filtro)setFiltro(true);
  }
  
useEffect(() => {
  if (searchText === '') {
    setFilterData(data);
  } else {
    setFilterData(data.filter(item => {
      const lowerSearchText = searchText.toLowerCase();
      const searchableFields = [
        item.nomeDoTreino.toLowerCase(),
        item.equipamento.toLowerCase(),
        ...item.musculos.map(musculo => musculo.toLowerCase()),
        ...item.tipo.map(tipo => tipo.toLowerCase())
      ];

      return searchableFields.some(field => field.includes(lowerSearchText));
    }));
  }
}, [searchText]);

   return (
    <View 
      style = {{
      flex: 1,
      backgroundColor: '#141414',
      padding : 5,
      height : 25
    }}>
      <View style={{flexDirection:"row"}}>
        <View style = {{
          flexDirection: 'row',
          backgroundColor : '#353535',
          height:45,
          borderRadius:13,
          justifyContent:"center",
          marginHorizontal:10,
        }}>
          <Image 
            style={{
              marginHorizontal:10,
              alignSelf:'center'
              
            }}
            source={require("../../component/imagens/Search.png")}/>
        
          <TextInput 
            style = {{
              width:250,
              color:"white",
              fontSize:17
            }}
            placeholder={"Pesquisar"}
            placeholderTextColor={"#505050"}
            onChangeText = {text => setSearchText(text)}
            value = {searchText}
          />
        </View>
        <TouchableOpacity
        onPress={()=>{setFiltro(true)}}
        >
          <Image 
          style={{
            alignSelf:'center'
          }}
          source={require("../../component/imagens/Menu.png")}/>
        </TouchableOpacity>
      </View>

        <FlatList
        data = {filterData}
        keyExtractor = {(item)=>item.id}
        renderItem = {({item}: {item:any})=>(
          
          <TouchableOpacity
          onPress={()=>
            navigation.navigate("Treino",{
              rotinaId:rotinaId,
              id: item.id,
              nomeDoTreino: item.nomeDoTreino,
              equipamento: item.equipamento,
              serieRepeticao:`${item.serie}x ${item.repeticao} `,
              carga:  item.carga,
              informacao: item.informacao,
              anotacao: item.anotacao,
              imagem:item.imagem
            })} 
          style = {{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#141414',
            borderColor: '#353535',
            borderWidth: 3,
            borderBottomWidth: 6,
            borderRadius: 13,
            marginVertical: 5,
            padding: 10
          }}>
        
          {item.imagem ? (
            <Image
            style = {{
              width: 50, 
              height: 50,
              borderRadius: 5,
              backgroundColor: 'red'
              }}
            source = {item.imagem}
            />
            ): (
              <Image
            style = {{
              width: 50, 
              height: 50,
              borderRadius: 5,
              backgroundColor: 'cyan'
              }}
            source = {require("../../component/imagens/iconImage.png")}
            />
            )}

            <View style = {{}}> 
              <View>
                <Text style = {{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  fontSize: 16,
                  color: "#fff",
                  alignItems: 'center'
                }}>{item.nomeDoTreino}
                </Text>
              </View>
              <View style = {{
                justifyContent: 'center',
                alignItems: 'center'
              }}> 
                <Text style = {{
                  marginVertical: 3,
                  fontSize: 20,
                  color: '#808080'
                }}>
                  {item.serie}x {item.repeticao} * {item.carga}kg
                </Text>
              </View>
            </View>
            <Text style ={{
              color:'#fff',
              fontSize: 30,
              justifyContent: 'space-between',
              fontFamily:'RoundedMplus1c-Bold',
              fontWeight: 'bold'
            }}>>
            </Text>
          </TouchableOpacity>
        )}
      />
      <Modal
      visible={filtro}
      transparent={true}
      
      >
      <View>
        <TouchableOpacity
        style={{height:110}}
        onPress={handleFiltro}
        />
        <View style={{flexDirection:'row-reverse'}}>
          <View
            style={{
              height:300,
              backgroundColor:'#141414',
              borderWidth:3,
              borderColor:'#353535',
              borderRadius:13,
              }}>

            <FlatList
              data={muscleTypes}
              keyExtractor={(item) => item}
              renderItem={({ item }:{item:any}) => (
                <TouchableOpacity
                  onPress={()=>{setSearchText(item);handleFiltro()}}
                >
                  <Text
                    style={{color:'white',fontSize:20,margin:10}}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity 
            style={{height:200,width:'100%'}}
            onPress={handleFiltro}
          />
            
        </View>
        <TouchableOpacity
        style={{ width:'100%',height:'100%'}}
        onPress={handleFiltro}
        />
      </View>
       
      </Modal>
    </View> 
   );
}