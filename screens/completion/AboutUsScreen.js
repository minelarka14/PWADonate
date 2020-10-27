import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

const AboutUsScreen = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}><Text style={styles.bolded}>Patients' Welfare Association®️</Text> located at Dr. Ruth K. M. Pfau
                Civil Hospital Karachi, is the largest student run, non-government
                and non-political organization of Pakistan. Our association is being
                run by students of Dow Medical College, providing humanitarian services
                free of charge for the last 41 years, reaching out to fulfill vital
                    medical needs of underprivileged patients especially at Civil Hospital Karachi. {`\n`}</Text>
                </View>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 16 }}>
                        <Text style={styles.bolded}>PWA has 2 working departments ;</Text> {`\n`}
                    1-) Blood transfusion services and, {`\n`}
                    2-) Thalassemia services
                    {`\n`}
                    </Text>
                </View>
                <View>
                    <Text style={styles.text}>
                        PWA blood bank dispatches more than <Text style={styles.bolded}>200 blood bags</Text> daily, which are screened for
                    HIV, Hepatitis B and C, Malaria and Syphilis in accordance with WHO guidelines. {`\n`}
                    </Text>
                </View>
                <View>
                    <Text style={styles.text}>Whereas, with <Text style={styles.bolded}>250 registered patients</Text> at Thalassemia Daycare
                Centre, we provide our patients with regular transfusions of screened blood, medications
                and hematologist consultancy <Text style={styles.bolded}>free of cost. {`\n`}</Text></Text>
                </View>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 16 }}>© Muhammad Osaid 2020</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default AboutUsScreen

const styles = StyleSheet.create({
    container: {
        padding: 40,
        paddingTop: 60,
    },
    text: {
        textAlign: 'justify',
        fontSize: 16
    },
    bolded: {
        fontWeight: 'bold'
    }
})
