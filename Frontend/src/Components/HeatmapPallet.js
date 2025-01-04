import HeatMap from '@uiw/react-heat-map';
import { useEffect, useState } from 'react';
import makeApiRequest from '../Assets/Apis';

function HeatmapPallet({ email }) {
    const [submissions, setSubmissions] = useState(null);

    // Calculate start and end dates
    const currentYear = new Date().getFullYear();
    const startDate = new Date(`${currentYear}/01/01`);
    const endDate = new Date(`${currentYear}/12/31`);

    useEffect(() => {
        makeApiRequest({
            url: `compiler/heatmap/${email}`,
            onSuccess: (data) => {
                // Transform the data (convert to YYYY/MM/DD format for compatibility)
                const transformedData = data.map(item => {
                    const date = new Date(item.created_at);
                    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
                    return {
                        date: formattedDate,
                        count: 1,
                        content: `Date: ${formattedDate}, Count: 1`
                    }; // Add content field
                });

                // Aggregate counts by date
                const aggregatedData = Object.values(
                    transformedData.reduce((acc, { date, count, content }) => {
                        acc[date] = acc[date] || { date, count: 0, content: `Date: ${date}, Count: 0` };
                        acc[date].count += count;
                        acc[date].content = `Date: ${date}, Count: ${acc[date].count}`;
                        return acc;
                    }, {})
                );

                setSubmissions(aggregatedData);
            },
            onError: (error) => {
                console.error(error);
            },
        });
    }, [email]);

    console.log(submissions);

    return (submissions ? (
        <HeatMap
            value={submissions}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
            space={1}
            rectSize={15} // Keep your desired rect size
            width={880} // Set a custom width for the heatmap in pixels
            height={170} // Set a custom height for the heatmap in pixels
            legendCellSize={15}
            panelColors={{
                0: '#f4decd',
                7: '#e4b293',
                14: '#d48462',
                21: '#c2533a',
                28: '#ad001d',
                35: '#6c0012'
            }}
        />
    ) : (
        <div>Loading Heatmap...</div>
    ));
};

export default HeatmapPallet;