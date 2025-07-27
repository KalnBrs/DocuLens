import './VisulizationPanel.css'
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts';


function putIds(themes) {
  if (!Array.isArray(themes)) return [];
  return themes.map((item, index) => ({
    id: index,
    value: item.count,
    label: item.theme,
  }));
}

function VisulizationPanel({commonWords, themeFreq, sentenceLen}) {
  return (
    <div className='card-bg border-2 rounded p-5'>
      <div className=' flex flex-row'>
        <CommonBar commonWords={commonWords} />  {/* Word Barchart */}
        <SentanceBar sentenceLen={sentenceLen} /> {/* Sentance Barchart */}
      </div> 
      <div className='flex flex-col'>
        <ThemePie theme={putIds(themeFreq)} /> {/* Theme Pie Chart */}
      </div>
    </div>
  )
}

function ThemePie({theme}) {
  return (
    <div>
      <p className='headers'>Theme Frequency:</p>
        <PieChart
          className='custom-pie'
          series={[{data: theme}]}
          width={200}
          height={200}
          sx={{
            '.MuiChartsLegend-root': {
              fontSize: 14,
              color: '#E0E1DD !important',
            },
            '.MuiChartsPieArc-root': {
              stroke: '#E0E1DD !important',           
              strokeWidth: 1,
            },
            '.MuiChartsPieArc-label': {
              fill: '#E0E1DD',
              fontSize: 14,
              fontWeight: 'bold',
            },
          }}
        />
    </div>
  )
}

function CommonBar({commonWords}) {
  return (
    <div className='flex flex-col justify-center w-75'>
    <p className='headers'>Common Words:</p>
    <BarChart 
      className='barchart'
      dataset={commonWords.topWords}
      yAxis={[{ scaleType: 'band', dataKey: 'word' }]}
      layout="horizontal"
      hideLegend
      series={[{ dataKey: 'count', label: 'Word Frequency', color: '#90BE6D' }]}
      height={300}
      sx={{
        '.MuiChartsAxis-tickLabel': {
          fontSize: 14,
          fill: '#E0E1DD !important',
        },
        '.MuiChartsAxis-line': {
          stroke: '#E0E1DD !important',
          strokeWidth: 1.5,
        },
        '.MuiChartsAxis-tick': {
          stroke: '#E0E1DD !important',
        }
      }}
    />
    </div>
  )
}

function SentanceBar({sentenceLen}) {
  return (
    <div className='flex flex-col justify-center w-75'>
    <p className='headers'>Sentence Length:</p>
    <BarChart
      dataset={sentenceLen}
      xAxis={[{ scaleType: 'band', dataKey: 'range'}]}
      series={[{ dataKey: 'count', label: 'Sentence Count', color: '#F9C74F' }]}
      hideLegend
      sx={{
        '.MuiChartsAxis-tickLabel': {
          fontSize: 14,
          fill: '#E0E1DD !important',
        },
        '.MuiChartsAxis-line': {
          stroke: '#E0E1DD !important',
          strokeWidth: 1.5,
        },
        '.MuiChartsAxis-tick': {
          stroke: '#E0E1DD !important',
        }
      }}
    />
    </div>
  )
}

export default VisulizationPanel