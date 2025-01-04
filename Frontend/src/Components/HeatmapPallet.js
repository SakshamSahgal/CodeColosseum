
import HeatMap from '@uiw/react-heat-map';
import { useEffect, useState } from 'react';
import makeApiRequest from '../Assets/Apis';

function HeatmapPallet({ email }) {


    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        makeApiRequest({
            url: `compiler/heatmap/${email}`,
            onSuccess: (data) => {
                
                // Transform the data (convert to YYYY/MM/DD format for compatibility)
                const transformedData = data.map(item => {
                    const date = new Date(item.created_at);
                    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
                    return { date: formattedDate, count: 1 }; // Initialize count as 1 for each submission
                });

                // Aggregate counts by date
                const aggregatedData = Object.values(
                    transformedData.reduce((acc, { date, count }) => {
                        acc[date] = acc[date] || { date, count: 0 };
                        acc[date].count += count;
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

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Calculate start and end dates
    const startDate = new Date(`${currentYear}/01/01`);
    const endDate = new Date(`${currentYear}/12/31`);

    console.log(submissions);

    return (
        <HeatMap
            value={submissions}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
            space={1}
            rectSize={15} // Keep your desired rect size
            width={880} // Set a custom width for the heatmap in pixels
            height={170} // Set a custom height for the heatmap in pixels
            // set width dynamically based on the screen size
            legendCellSize={15}
        />
    );
};

export default HeatmapPallet;
