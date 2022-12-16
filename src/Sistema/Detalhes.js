import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import { IconButton } from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Detalhes({ navigation,route }) {
  const id = route?.params?.id;

  const {addFilmeToFavoritos, filmesFavoritos} = route.params;
 
  const [filme, setFilme] = useState({});
  const [favorito, setFavorito] = useState(false);

  const getFilmes = async (filmesId) => {
    try {
      const resposta = await fetch(
        'https://api.themoviedb.org/3/movie/' + filmesId + '?api_key=3e8dec90feebc5e7d11344d90f9d75fe&language=pt-BR' 
      );
      const json = await resposta.json();
      setFilme(json);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getFilmes(id);
    const favoritoNew = filmesFavoritos?.some(f => f.id == filme.id);
    setFavorito(favoritoNew);


  }, [id],[filmesFavoritos]);

  return (
    <View style={{flex: 1, paddingTop: 40, backgroundColor: '#000000'}}>
      <IconButton icon='mark' onPress={() => navigation.navigate('Playlist',{filmes: filmesFavoritos, addFilmeToFavoritos, filmesFavoritos})}></IconButton>
      {id ? (
        <View style={{alignItems: 'center'}}>
      
          <Text style={styles.text}>Nome: {filme.title}</Text>
          <Text style={styles.text}>Avaliação: {filme.vote_average}</Text>
          
          <Ionicons name='add-circle-outline' size={25} color="#fff"
          onPress={() => addFilmeToFavoritos(filme)}/>

          <View>
            <Text style={styles.text}>Sinopse: {filme.overview}</Text>
            <Text style={styles.text}>Lançamento: {filme.release_date}</Text>
          </View>

          {
            favorito && <Text>Sou favorito!</Text>
          }

        </View>

      ) : (
        <View>
          <Text>Cadê o id?</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    color: '#fff',

  }
})