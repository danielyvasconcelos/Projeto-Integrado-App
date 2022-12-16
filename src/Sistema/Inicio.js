import { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Button, Card, IconButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Inicio({ navigation }) {
  const [filmes, setFilmes] = useState([]);

  const [filmesFavoritos, setFilmesFavoritos] = useState([]);

  const addFilmeToFavoritos  = (filme) => {
    const newFavoritos = [...filmesFavoritos];
    newFavoritos.push(filme);
    setFilmesFavoritos(newFavoritos);
  }


  const getFilmes = async () => {
    try {
      const resposta = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=3e8dec90feebc5e7d11344d90f9d75fe&language=pt-BR&page=1'
      );
      const json = await resposta.json();
      setFilmes(json.results);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToDetails = (id) => {
    navigation.navigate('Detalhes', { id, addFilmeToFavoritos, filmesFavoritos })
  }

  useEffect(() => {
    getFilmes();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>

      <IconButton icon='mark' onPress={() => navigation.navigate('Playlist',{filmes: filmesFavoritos, addFilmeToFavoritos, filmesFavoritos})}></IconButton>
      <Text style={{color:'white'}}>Favoritos</Text>
      <Text style={{fontSize: 22, color: '#fff', padding: 5}}>Lançamentos</Text>
      <View>
      <FlatList
        data={filmes}
        horizontal={true}
        renderItem={({ item }) => (
           
        <Card onPress={() => navigateToDetails(item.id)}>
          <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w200/' + item.poster_path}} 
            style={{width: 125, height: 200, padding: 5, backgroundColor: '#000000', borderRadius: 0}}/>
        </Card>  
        
        )}
      />
      </View>

      <Text style={{fontSize: 22, color: '#fff', padding: 5}}>Em alta</Text>
      <View>
      <FlatList
        data={filmes}
        horizontal={true}
        renderItem={({ item }) => (
           
        <Card onPress={() => navigateToDetails(item.id)}>
          <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w200/' + item.poster_path}} 
            style={{width: 125, height: 200, padding: 5, backgroundColor: '#000000', borderRadius: 0}}/>
            <Card.Actions>
            <Button name='add-circle-outline' size={25} color="#fff" 
                onPress={() => addFilmeToFavoritos(item)}> Add
            </Button>
            </Card.Actions>
        </Card>  
        
        )}
      />
      </View>

      <Text style={{fontSize: 22, color: '#fff', padding: 5}}>Top 10</Text>
      <View>
      <FlatList
        data={filmes}
        horizontal={true}
        renderItem={({ item }) => (
           
        <Card onPress={() => navigateToDetails(item.id)}>
          <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w200/' + item.poster_path}} 
            style={{width: 125, height: 200, padding: 5, backgroundColor: '#000000', borderRadius: 0}}/>
        </Card>  
        
        )}
      />
      </View>
    </View>
  );
}