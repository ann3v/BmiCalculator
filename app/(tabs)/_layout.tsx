import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [bgColor, setBgColor] = useState('#0a192f');
  const [diff, setDiff] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

 const calculateBMI = () => {
  const h = parseFloat(height) / 100;
  const w = parseFloat(weight);

  if (!h || !w) return alert('Please enter valid height and weight');

  const bmiValue = w / (h * h);
  const bmiFixed = parseFloat(bmiValue.toFixed(1));
  setBmi(bmiFixed);

  fadeAnim.setValue(0);
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 800,
    useNativeDriver: true,
  }).start();

  // Set category and background color
  if (bmiValue < 18.5) {
    setCategory('Underweight 😕');
    setBgColor('#1e3a5f');
    const minWeight = 18.5 * h * h;
    setDiff(parseFloat((minWeight - w).toFixed(1)));
  } else if (bmiValue <= 25) {
    setCategory('Normal weight 😃');
    setBgColor('#0a192f');
    setDiff(0);
  } else {
    setCategory('Overweight 😐');
    setBgColor('#1e3a5f');
    const maxWeight = 25 * h * h;
    setDiff(parseFloat((w - maxWeight).toFixed(1)));
  }
};

const getRecommendation = () => {
  if (diff === null) return '';

  if (diff === 0) {
    return 'Perfect! You are in normal weight 😃';
  } else if (diff > 0) {
    return `You need to lose at least ${Math.abs(diff)} kg to reach normal weight`;
  } else {
    return `You need to gain at least ${Math.abs(diff)} kg to reach normal weight`;
  }
};

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={styles.container}>
        <Text style={styles.title}>BMI Calculator</Text>
        <Text style={styles.subtitle}>Check Your Body Mass Index</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder='Enter height'
            placeholderTextColor="#8892b0"
            keyboardType='numeric'
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder='Enter weight'
            placeholderTextColor="#8892b0"
            keyboardType='numeric'
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>

        {bmi && (
          <Animated.View style={[styles.resultContainer, { opacity: fadeAnim }]}>
            <View style={styles.bmiCircle}>
              <Text style={styles.bmiValue}>{bmi}</Text>
              <Text style={styles.bmiLabel}>BMI Score</Text>
            </View>
            
            <Text style={styles.categoryText}>{category}</Text>

            {/* Simple Table */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.cellHeader, { width: '50%' }]}>Category</Text>
                <Text style={[styles.cell, { width: '50%' }]}>{category}</Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={[styles.cellHeader, { width: '50%' }]}>Ideal Weight</Text>
                <Text style={[styles.cell, { width: '50%' }]}>
                  {(24.9 * Math.pow(parseFloat(height) / 100, 2)).toFixed(1)} kg
                </Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={[styles.cellHeader, { width: '50%' }]}>Recommendation</Text>
                <Text style={[styles.cell, { width: '50%' }]}>{getRecommendation()}</Text>
              </View>
            </View>
          </Animated.View>
        )}

        <StatusBar style="light" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#64ffda',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccd6f6',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#ccd6f6',
  },
  input: {
    backgroundColor: '#112240',
    borderWidth: 1,
    borderColor: '#233554',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#e6f1ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  button: {
    backgroundColor: '#64ffda',
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#64ffda',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: '#0a192f',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 40,
    backgroundColor: '#112240',
    width: '100%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#233554',
  },
  bmiCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#64ffda',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#64ffda',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bmiValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0a192f',
  },
  bmiLabel: {
    fontSize: 12,
    color: '#0a192f',
    fontWeight: '600',
    marginTop: 4,
  },
  categoryText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#64ffda',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#0a192f',
    borderWidth: 1,
    borderColor: '#233554',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#233554',
  },
  cellHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#64ffda',
    padding: 14,
    backgroundColor: '#1e3a5f',
  },
  cell: {
    fontSize: 14,
    color: '#e6f1ff',
    padding: 14,
    backgroundColor: '#112240',
  },
});