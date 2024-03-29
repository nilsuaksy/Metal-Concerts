import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, Divider, TextInput } from 'react-native-paper'
import { concertsList } from '../data/concertsList'
import DatePicker from 'react-native-date-picker'
import dayjs from 'dayjs'
import 'dayjs/locale/tr'

const ConcertsScreen = () => {

  dayjs.locale('tr')

  const [concerts, setConcerts] = useState(concertsList)

  const [startDate, setStartDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [endDate, setEndDate] = useState(new Date())
  const [open2, setOpen2] = useState(false)



  const searchByName = (name: string) => {

    var name = name.trim()

    let filteredConcerts = concertsList.filter(item => item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))

    setConcerts(filteredConcerts)

  }

  const searchByDate = () => {

    let startDateWithFormat = dayjs(startDate).format("DD-MM-YYYY")
    let endDateWithFormat = dayjs(endDate).format("DD-MM-YYYY")



    let filteredConcerts = concertsList.filter(item => dayjs(item.date, "DD-MM-YYYY").isAfter(startDateWithFormat) && dayjs(item.date, "DD-MM-YYYY").isBefore(endDateWithFormat))

    setConcerts(filteredConcerts)

  }


  return (<>
    <ScrollView style={{ paddingLeft: '3%', paddingRight: '3%' }}>

      <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

        <Text>{dayjs(startDate).format('DD MMMM, dddd, YYYY')}</Text>
        <Button onPress={() => setOpen(true)} mode="contained" style={{ marginBottom: '2%', marginLeft: 5 }}>
          Başlangıç Tarihi
        </Button>
      </View>

      <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        <Text>{dayjs(endDate).format('DD MMMM, dddd, YYYY')}</Text>
        <Button onPress={() => setOpen2(true)} mode="contained" style={{ marginBottom: '2%', marginLeft: 5 }}>
          Bitiş Tarihi
        </Button>
      </View>

      <View>
        <Button onPress={() => searchByDate()} mode="contained">Tarih Aralığına Göre Ara</Button>
        <Button onPress={() => setConcerts(concertsList)}>Filtre Temizle</Button>
      </View>


      <DatePicker
        modal
        open={open}
        date={startDate}
        onConfirm={(date) => {
          setOpen(false)
          setStartDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        mode="date"
      />

      <DatePicker
        modal
        open={open2}
        date={endDate}
        onConfirm={(date) => {
          setOpen2(false)
          setEndDate(date)
        }}
        onCancel={() => {
          setOpen2(false)
        }}
        mode="date"
      />

      <Divider style={{ marginBottom: '2%' }} />


      <TextInput
        label="Search By Name"
        onChangeText={text => searchByName(text)}
        style={{ marginBottom: '2%' }}
      />
      {
        concerts.map((item, index) => {
          return <Card key={item.id}>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Title titleStyle={{ fontSize: 25 }} title={item.name} subtitle={item.date} />
            <Card.Content>
              <Text>{item.description}</Text>
            </Card.Content>
          </Card>
        })
      }

    </ScrollView>

  </>)
}

export default ConcertsScreen