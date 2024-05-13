import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MoreScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLtfpTZCINHBs4Da_oVcnBIslHS-gk-3cg3spxsoc8h_DDdU-Btt-SrPDoBqoUJenw9U0&usqp=CAU' }}
          style={styles.logo}
        />
      </View>
      <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
        <FontAwesome name="bars" size={24} color="#fff" />
        <Text style={styles.modalButtonText}> View List</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <FontAwesome name="times" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => console.log('Account')}>
              <Text style={styles.modalText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => console.log('Settings')}>
              <Text style={styles.modalText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => console.log('Help')}>
              <Text style={styles.modalText}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => console.log('About')}>
              <Text style={styles.modalText}>About</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  logo: {
    width: 400,
    height: 200,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  modalButtonText: {
    color: '#fff',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  closeButton: {
    alignItems: 'center',
    padding: 7,
    marginBottom: 0,
    marginLeft: 280,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalText: {
    fontSize: 18,
  },
});

export default MoreScreen;
