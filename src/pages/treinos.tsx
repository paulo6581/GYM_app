import React from "react";
import { View ,Text, FlatList, Image, TouchableOpacity} from "react-native";


export function Treinos({route, navigation}: {route: any, navigation: any}){
  const data = [
    {id: '021',
    imagem: 'https://media-gig4-2.cdn.whatsapp.net/v/t61.24694-24/71490176_494802287889928_8282450680586376557_n.jpg?ccb=11-4&oh=01_Q5AaILs-oIFJ2NQ12Fispj3zIcjzGtp6cypyFnRU-C41Xy9F&oe=662E96F7&_nc_sid=e6ed6c&_nc_cat=103', 
    nome: 'Paulo Viado',
    serie: '3',
    repeticao: '15',
    carga: '80'},
    {id: '125',
    imagem: 'https://media-gig4-2.cdn.whatsapp.net/v/t61.24694-24/399500670_362691452980858_5581245754922342901_n.jpg?ccb=11-4&oh=01_Q5AaIH1puTjeuVqa-uKmHDYmqqwA7TXXq4uE7BTF25ov2u_J&oe=662E9247&_nc_sid=e6ed6c&_nc_cat=100', 
    nome: 'Thiago Gay',
    serie: '5',
    repeticao: '20',
    carga: '120'}
  ]

  const {id,desc,indice} = route.params;
  return(
    <View style={{
      backgroundColor:"#141414",
      padding: 5,
      flex: 1
      }}>
      <Text style = {{
        color: '#fff',
        margin: 10
      }}>{desc}
      </Text>
      <FlatList
        data = {data}
        keyExtractor = {(item)=>item.id}
        renderItem = {({item}: {item:any})=>(
          <TouchableOpacity style = {{
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
            <Image
            style = {{
              width: 50, 
              height: 50,
              borderRadius: 5
              }}
            source = {{uri:item.imagem}}
            />
            <View style = {{}}> 
              <View>
                <Text style = {{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  fontSize: 20,
                  color: "#fff",
                  alignItems: 'center'
                }}>{item.nome}
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
      <TouchableOpacity  onPress={() => navigation.navigate("addTreinos")} 
        style={{
              backgroundColor:'#0038a4',
              width:'95%',
              height:50,
              borderRadius:13,
              alignItems:'center',
              justifyContent:'center',
              borderBottomWidth:5,
              borderColor:'#002368',
              alignSelf: 'center',
              marginVertical: 5
        }}>
        <Text style={{
          color: '#ffff',
        }}>
        Adicionar Exercicio
        </Text>
      </TouchableOpacity>
    </View>
  )
}