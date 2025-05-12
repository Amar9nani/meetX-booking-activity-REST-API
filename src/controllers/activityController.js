import supabase from '../config/supabase.js';

/**
 * Get all activities
 * @route GET /api/activities
 */
export const getAllActivities = async (req, res) => {
  try {
    // Get query parameters for filtering
    const { type, date, location } = req.query;
    
    // Build query
    let query = supabase
      .from('activities')
      .select('*');
    
    // Apply filters if provided
    if (type) query = query.eq('type', type);
    if (location) query = query.eq('location', location);
    if (date) query = query.eq('date', date);
    
    // Execute query
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching activities:', error);
      return res.status(500).json({ error: 'Failed to fetch activities' });
    }

    res.json({ activities: data });
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get activity by ID
 * @route GET /api/activities/:id
 */
export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: activity, error } = await supabase
      .from('activities')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json({ activity });
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Book an activity
 * @route POST /api/activities/:id/book
 */
export const bookActivity = async (req, res) => {
  try {
    const { id: activityId } = req.params;
    const userId = req.user.id;

    // Check if activity exists
    const { data: activity, error: activityError } = await supabase
      .from('activities')
      .select('*')
      .eq('id', activityId)
      .single();

    if (activityError || !activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    // Check if already booked
    const { data: existingBooking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .eq('activity_id', activityId)
      .single();

    if (existingBooking) {
      return res.status(409).json({ error: 'You have already booked this activity' });
    }

    // Create booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([
        { user_id: userId, activity_id: activityId }
      ])
      .select();

    if (error) {
      console.error('Error creating booking:', error);
      return res.status(500).json({ error: 'Failed to book activity' });
    }

    res.status(201).json({
      message: 'Activity booked successfully',
      booking: booking[0]
    });
  } catch (error) {
    console.error('Book activity error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get user's bookings
 * @route GET /api/bookings
 */
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        id,
        created_at,
        activities (
          id,
          title,
          description,
          location,
          date,
          time,
          type
        )
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching bookings:', error);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }

    // Format bookings for better readability
    const formattedBookings = data.map(booking => ({
      id: booking.id,
      created_at: booking.created_at,
      activity: booking.activities
    }));

    res.json({ bookings: formattedBookings });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};